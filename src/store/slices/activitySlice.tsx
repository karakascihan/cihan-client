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
  ActivityDto,
  ActivityDtoForInsertion,
  ActivityDtoForUpdate,
} from "@/api/apiDtos";
import { toJsonPatch } from "@/utils/commonUtils";

export interface IActivityState {
  data: ActivityDto[];
  loading: boolean;
  error: string | null;
}

const initialState: IActivityState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchActivities = createAsyncThunk<ActivityDto[],{relatedEntityId?:number,relatedEntityName?:string}>(
  "activity/fetchAll",
  async ({relatedEntityId,relatedEntityName}, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<ActivityDto[]>>(
        "GET",
        URL + "/activity/getall"+(relatedEntityId ? "?relatedEntityId="+relatedEntityId+"&relatedEntityName="+relatedEntityName:""),
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
export const addActivity = createAsyncThunk<
  ActivityDtoForInsertion,
  Partial<ActivityDtoForInsertion>
>(
  "activity/add",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<ActivityDto>>(
        "POST",
        URL + "/activity/create",
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
export const updateActivity = createAsyncThunk<
  ActivityDtoForUpdate,
  Partial<ActivityDtoForUpdate>
>(
  "activity/update",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<ActivityDto>>(
        "PUT",
        URL + "/activity/update",
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

// 📌Alanlari Güncelleme
export const patchActivity = createAsyncThunk<
  ActivityDto,
  { id: number; changes: Partial<ActivityDtoForUpdate> }
>(
  "activity/patch",
  async ({id,changes}, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      // Partial objeyi JSON Patch'e dönüştür
      const patchDoc = toJsonPatch<ActivityDtoForUpdate>(changes);

      const response = await apiRequest<ApiResponseClient<ActivityDto>>(
        "PATCH",
        URL + "/activity/patch/" + id,
        { Authorization: "Bearer " + state.login.accessToken, "Content-Type": "application/json-patch+json" },
        patchDoc
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
          title: "Güncelleme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

// 📌 Silme
export const deleteActivity = createAsyncThunk<number, number>(
  "activity/delete",
  async ( id, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<ActivityDto>>(
        "delete",
        URL + "/activity/delete" + "/" + id,
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

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchActivities.fulfilled,
        (state, action: PayloadAction<ActivityDto[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
      .addCase(
        addActivity.fulfilled,
        (state, action: PayloadAction<ActivityDto>) => {
          if (action.payload.id) {
            const index = state.data.findIndex(
              (item) => item.id === action.payload.id
            );
            if (index !== -1) {
              state.data[index] = action.payload;
            } else state.data.unshift(action.payload);
          }
        }
      )
      .addCase(updateActivity.fulfilled, (state, action: PayloadAction<ActivityDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }).addCase(patchActivity.fulfilled, (state, action: PayloadAction<ActivityDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(
        deleteActivity.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      );
  },
});

export default activitySlice.reducer;
