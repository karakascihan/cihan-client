import { ApiResponseClient } from '@/types/apiResponse';
import { StaffLeave } from '@/types/commonType';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';
import { setNotification } from './notificationSlice';
import { STAFFLEAVE_CREATE, STAFFLEAVE_DELETE, STAFFLEAVE_GETALL } from '@/api';
import { apiRequest } from '@/services/apiRequestService';
import { RootState } from '../store';

interface StaffLeaveState {
  data: StaffLeave[];
  loading: boolean;
  error: string | null;
}

const initialState: StaffLeaveState = {
  data: [],
  loading: false,
  error: null,
};

// 📌 Listeleme
export const fetchStaffLeaves = createAsyncThunk<StaffLeave[]>(
  'staffLeave/fetchAll',
  async (newlist,{dispatch,rejectWithValue,getState}) => {
   try {
    const state =getState() as RootState;
    const response = await apiRequest<ApiResponseClient<StaffLeave []>>("GET",STAFFLEAVE_GETALL,{Authorization:"Bearer "+state.login.accessToken});
    dispatch(setNotification({title:response?.message ??"",message:" ",type:response.statusCode===500?"error": response.isSuccess? "success":"warning"}));
    return response.result;
  } catch (error) {
      dispatch(setNotification({message: error.message,title: "Listeleme İşlemi Başarısız",type:"error"}));
      return rejectWithValue(error);
  }
    
  }
);

// 📌 Ekleme
export const addStaffLeave = createAsyncThunk<StaffLeave, Partial<StaffLeave>>(
  'staffLeave/add',
  async (newLeave,{rejectWithValue,dispatch,getState}) => {
  try {
     const state =getState() as RootState;
    const response = await apiRequest<ApiResponseClient<StaffLeave>>("POST",STAFFLEAVE_CREATE,{Authorization:"Bearer "+state.login.accessToken},newLeave);
    dispatch(setNotification({title:response?.message ??"",message:" ",type:response.statusCode===500?"error": response.isSuccess? "success":"warning"}));
    return response.result;
  } catch (error) {
      dispatch(setNotification({message: error.message,title: "Kayıt İşlemi Başarısız",type:"error"}));
      return rejectWithValue(error);
  }
    
  }
);

// 📌 Silme
export const deleteStaffLeave = createAsyncThunk<number,number>(
  'staffLeave/delete',
  async (id,{dispatch,rejectWithValue,getState}) => {
   try {
     const state =getState() as RootState;
    const response = await apiRequest<ApiResponseClient<StaffLeave>>("delete",STAFFLEAVE_DELETE+"/"+id,{Authorization:"Bearer "+state.login.accessToken});
    dispatch(setNotification({title:response?.message ??"",message:" ",type:response.statusCode===500?"error": response.isSuccess? "success":"warning"}));
    return id;
  } catch (error) {
      dispatch(setNotification({message: error.message,title: "Silme İşlemi Başarısız",type:"error"}));
      return rejectWithValue(error);
  }
    
  }
)

const staffLeaveSlice = createSlice({
  name: 'staffLeave',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffLeaves.fulfilled, (state, action: PayloadAction<StaffLeave[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStaffLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Veri alınamadı';
      })
      .addCase(addStaffLeave.fulfilled, (state, action: PayloadAction<StaffLeave>) => {
        if (action.payload.id) {
          const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        else
        state.data.unshift(action.payload);
   } })
      // .addCase(updateStaffLeave.fulfilled, (state, action: PayloadAction<StaffLeave>) => {
      //   const index = state.data.findIndex((item) => item.id === action.payload.id);
      //   if (index !== -1) {
      //     state.data[index] = action.payload;
      //   }
      // })
      .addCase(deleteStaffLeave.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default staffLeaveSlice.reducer;
