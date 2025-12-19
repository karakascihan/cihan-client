import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setNotification } from "./notificationSlice";
import { ApiResponseClient } from "@/types/apiResponse";
import { apiRequest } from "@/services/apiRequestService";
import { URL } from "@/api";
import { FileRecordDto, FileRecordDtoForInsertion, FileRecordDtoForUpdate } from "@/api/apiDtos";
import { GenericState } from "../genericSliceFactory";

// Initial state
const initialState: GenericState<FileRecordDto> = {
  items: [],
  loading: false,
  error: null,
};

// 📌 Fetch all
export const fetchFileRecords = createAsyncThunk<
  FileRecordDto[],
  { relatedEntityId?: number; relatedEntityName?: string }
>(
  "fileRecord/fetchAll",
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const query =payload.relatedEntityId && payload.relatedEntityName
          ? `?relatedEntityId=${payload.relatedEntityId}&relatedEntityName=${payload.relatedEntityName}`
          : "";
      const response = await apiRequest<ApiResponseClient<FileRecordDto[]>>(
        "GET",
        URL + "/fileRecord/getall" + query,
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
      const errorMessage = error instanceof Error ? error.message : String(error);
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

// 📌 Add
export const addFileRecord = createAsyncThunk<
  FileRecordDto,
  FileRecordDtoForInsertion
>(
  "fileRecord/add",
  async (newRecord, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<FileRecordDto>>(
        "POST",
        URL + "/fileRecord/create",
        { Authorization: "Bearer " + state.login.accessToken },
        newRecord
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
      const errorMessage = error instanceof Error ? error.message : String(error);
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

// 📌 Update
export const updateFileRecord = createAsyncThunk<
  FileRecordDto,
  FileRecordDtoForUpdate
>(
  "fileRecord/update",
  async (updatedRecord, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<FileRecordDto>>(
        "PUT",
        URL + "/fileRecord/update",
        { Authorization: "Bearer " + state.login.accessToken },
        updatedRecord
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
      const errorMessage = error instanceof Error ? error.message : String(error);
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

// 📌 Delete
export const deleteFileRecord = createAsyncThunk<number, number>(
  "fileRecord/delete",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<FileRecordDto>>(
        "DELETE",
        URL + "/fileRecord/delete/" + id,
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
      const errorMessage = error instanceof Error ? error.message : String(error);
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

// Slice
const fileRecordSlice = createSlice({
  name: "fileRecord",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileRecords.pending, (state) => {
        state.loading = true;
        
        state.error = null;
      })
      .addCase(
        fetchFileRecords.fulfilled,
        (state, action: PayloadAction<FileRecordDto[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchFileRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
      .addCase(addFileRecord.fulfilled, (state, action: PayloadAction<FileRecordDto>) => {
        if (action.payload.id) {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) state.items[index] = action.payload;
          else state.items.unshift(action.payload);
        }
      })
      .addCase(updateFileRecord.fulfilled, (state, action: PayloadAction<FileRecordDto>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteFileRecord.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default fileRecordSlice.reducer;
