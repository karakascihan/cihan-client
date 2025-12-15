// store/selectedRowsSlice.ts
import { EducationPlanAssingService } from "@/services";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import { RootState } from "../store";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponse } from "@/types/apiResponse";
import { EDUCATION_PLAN_ASSIGN } from "@/api";
import { updateActivity } from "./activitySlice";
import { ActivityDto } from "@/api/apiDtos";

interface SelectedRowsState<T = any> {
  [tableId: string]: T[];
}
interface dd {
 educationId: number
}
export const setDataToApi = createAsyncThunk(
  'selectedRows/setDataToApi',
   ({datar}:{datar:dd},{rejectWithValue,dispatch,getState }) => {
    try {
         const state = getState() as RootState; // Tüm redux state'i alırsın
         const selectedRows = state.selectedRows["my-table-id"]; 
          apiRequest<ApiResponse<any>>("POST",EDUCATION_PLAN_ASSIGN+"?educationId="+datar.educationId,{ Authorization: "Bearer " + state.login.accessToken },selectedRows.map((x: any) => (
            x
          )))
            .then((response) => {
              dispatch(setNotification({ message: response.message, title: "Başarılı" }));
              console.log("Personel başarıyla atandı:", response);
            })
            .catch((error) => {
              dispatch(setNotification(error.message));
      
              console.error("Personel atama sırasında hata oluştu:", error);
            });
      
          //  setPersonelIds([]);
        
    } catch (error) {
      console.error('Auth durumu kontrol hatası:', error);
      return null;
    }
  }
);
export const setAktiviteSelectedRows = createAsyncThunk(
  'selectedRows/setAktiviteSelectedRows',
   ({result,opportunity}:{result:ActivityDto [],opportunity:number},{rejectWithValue,dispatch,getState }) => {
    try {
         const state = getState() as RootState; // Tüm redux state'i alırsın
         const selectedRows = state.selectedRows["my-table-id"]; 
            for (let index = 0; index < selectedRows.length; index++) {
                        const akt = result.find(r=>r.id==selectedRows[index]);
                        if (akt) {
                          akt.relatedEntityId=opportunity;
                          akt.relatedEntityName="Opportunity";
                          dispatch(updateActivity(akt));
                        }
                      }
        
    } catch (error) {
      console.error('Auth durumu kontrol hatası:', error);
      return null;
    }
  }
);
const initialState: SelectedRowsState = {};

const selectedRowsSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    setSelectedRows: <T>(
      state: SelectedRowsState<T>,
      action: PayloadAction<{ tableId: string; rows: T[] }>
    ) => {
      state[action.payload.tableId] = action.payload.rows;
    },
    clearSelectedRows: (state, action: PayloadAction<{ tableId: string }>) => {
      delete state[action.payload.tableId];
    },
  },
});

export const { setSelectedRows, clearSelectedRows } = selectedRowsSlice.actions;
export default selectedRowsSlice.reducer;
