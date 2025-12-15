import { ApiResponseClient } from '@/types/apiResponse';
import { Overtime } from '@/types/commonType';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setNotification } from './notificationSlice';
import { OVERTIME_CREATE, OVERTIME_DELETE, OVERTIME_GETALL } from '@/api';
import { RootState } from '../store';
import { apiRequest } from '@/services/apiRequestService';

interface OvertimeState {
  data: Overtime[];
  loading: boolean;
  error: string | null;
}

const initialState: OvertimeState = {
  data: [],
  loading: false,
  error: null,
};

// 📌 Listeleme
export const fetchOvertimes = createAsyncThunk<Overtime[]>(
  'overtime/fetchAll',
    async (newlist,{dispatch,rejectWithValue,getState}) => {
     try {
      const state =getState() as RootState;
    const response = await apiRequest<ApiResponseClient<Overtime []>>("GET",OVERTIME_GETALL,{Authorization:"Bearer "+state.login.accessToken});
    dispatch(setNotification({title:response?.message ??"",message:" ",type:response.statusCode===500?"error": response.isSuccess? "success":"warning"}));
    return response.result;
  } catch (error) {
      dispatch(setNotification({message: error.message,title: "Listeleme İşlemi Başarısız",type:"error"}));
      return rejectWithValue(error);
  }
    
  }
);

// 📌 Ekleme
export const addOvertime = createAsyncThunk<Overtime, Partial<Overtime>>(
  'overtime/add',
  async (newLeave,{rejectWithValue,dispatch,getState}) => {
  try {
          const state =getState() as RootState;

    const response = await apiRequest<ApiResponseClient<Overtime>>("POST",OVERTIME_CREATE,{Authorization:"Bearer "+state.login.accessToken},newLeave);
    dispatch(setNotification({title:response?.message ??"",message:" ",type:response.statusCode===500?"error": response.isSuccess? "success":"warning"}));
    return response.result;
  } catch (error) {
      dispatch(setNotification({message: error.message,title: "Kayıt İşlemi Başarısız",type:"error"}));
      return rejectWithValue(error);
  }
    
  }
);

// 📌 Silme
export const deleteOvertime = createAsyncThunk<number,number>(
  'overtime/delete',
  async (id,{dispatch,rejectWithValue,getState}) => {
   try {
     const state =getState() as RootState;
    const response = await apiRequest<ApiResponseClient<Overtime>>("delete",OVERTIME_DELETE+"/"+id,{Authorization:"Bearer "+state.login.accessToken});
    dispatch(setNotification({title:response?.message ??"",message:" ",type:response.statusCode===500?"error": response.isSuccess? "success":"warning"}));
    return id;
  } catch (error) {
      dispatch(setNotification({message: error.message,title: "Silme İşlemi Başarısız",type:"error"}));
      return rejectWithValue(error);
  }
    
  }
)

const overtimeSlice = createSlice({
  name: 'overtime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOvertimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOvertimes.fulfilled, (state, action: PayloadAction<Overtime[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOvertimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Veri alınamadı';
      })
      .addCase(addOvertime.fulfilled, (state, action: PayloadAction<Overtime>) => {
        if (action.payload.id) {
          const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        
        else
        state.data.unshift(action.payload);
  }})
      // .addCase(updateOvertime.fulfilled, (state, action: PayloadAction<Overtime>) => {
      //   const index = state.data.findIndex((item) => item.id === action.payload.id);
      //   if (index !== -1) {
      //     state.data[index] = action.payload;
      //   }
      // })
      .addCase(deleteOvertime.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default overtimeSlice.reducer;
