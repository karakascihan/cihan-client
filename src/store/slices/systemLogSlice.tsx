import { ApiResponseClient } from "@/types/apiResponse";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import {
  STAFFLEAVE_CREATE,
  STAFFLEAVE_DELETE,
  STAFFLEAVE_GETALL,
  URL,
} from "@/api";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "../store";
import {
  SystemLogDto,
  SystemLogDtoForInsertion,
  SystemLogDtoForUpdate
} from "@/api/apiDtos";
import { toJsonPatch } from "@/utils/commonUtils";
import { GenericState } from "../genericSliceFactory";


const initialState: GenericState<SystemLogDto> = {
  items: [],
  loading: false,
  error: null,
};
export const fetchsystemLogs = createAsyncThunk<SystemLogDto[],{relatedEntityId?:number,relatedEntityName?:string}>(
  "systemLog/fetchAll",
  async ({relatedEntityId,relatedEntityName}, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<SystemLogDto[]>>(
        "GET",
        URL + "/systemLog/getall"+(relatedEntityId ? "?relatedEntityId="+relatedEntityId+"&relatedEntityName="+relatedEntityName:""),
        { Authorization: "Bearer " + state.login.accessToken }
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.statusCode !== 0
              ? "error"
              : response.isSuccess
              ? "success"
              : "warning",
        })
      );
      return response.result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch(
        setNotification({
          message: errorMessage,
          title: "Listeleme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);
// 📌 Ekleme
export const addsystemLog = createAsyncThunk<
  SystemLogDtoForInsertion,
  Partial<SystemLogDtoForInsertion>
>(
  "systemLog/add",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<SystemLogDto>>(
        "POST",
        URL + "/systemLog/create",
        { Authorization: "Bearer " + state.login.accessToken },
        newLeave
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.statusCode === 500
              ? "error"
              : response.isSuccess
              ? "success"
              : "warning",
        })
      );
      return response.result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch(
        setNotification({
          message: errorMessage,
          title: "Kayıt İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);
// 📌 Güncelleme
export const updatesystemLog = createAsyncThunk<
  SystemLogDtoForUpdate,
  Partial<SystemLogDtoForUpdate>
>(
  "systemLog/update",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<SystemLogDto>>(
        "PUT",
        URL + "/systemLog/update",
        { Authorization: "Bearer " + state.login.accessToken },
        newLeave
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.statusCode === 500
              ? "error"
              : response.isSuccess
              ? "success"
              : "warning",
        })
      );
      return response.result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch(
        setNotification({
          message: errorMessage,
          title: "Güncelleme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);


// 📌 Silme
export const deletesystemLog = createAsyncThunk<number, number>(
  "systemLog/delete",
  async ( id, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<SystemLogDto>>(
        "delete",
        URL + "/systemLog/delete" + "/" + id,
        { Authorization: "Bearer " + state.login.accessToken }
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.statusCode === 500
              ? "error"
              : response.isSuccess
              ? "success"
              : "warning",
        })
      );
      return id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch(
        setNotification({
          message: errorMessage,
          title: "Silme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

const systemLogSlice = createSlice({
  name: "systemLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchsystemLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchsystemLogs.fulfilled,
        (state, action: PayloadAction<SystemLogDto[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchsystemLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
      .addCase(
        addsystemLog.fulfilled,
        (state, action: PayloadAction<SystemLogDto>) => {
          if (action.payload.id) {
            const index = state.items.findIndex(
              (item) => item.id === action.payload.id
            );
            if (index !== -1) {
              state.items[index] = action.payload;
            } else state.items.unshift(action.payload);
          }
        }
      )
      .addCase(updatesystemLog.fulfilled, (state, action: PayloadAction<SystemLogDto>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(
        deletesystemLog.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      );
  },
});

export default systemLogSlice.reducer;
