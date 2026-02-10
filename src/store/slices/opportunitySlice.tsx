import { ApiResponseClient } from "@/types/apiResponse";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import {
  URL,
} from "@/api";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "../store";
import {
  OpportunityDto,
  OpportunityDtoForInsertion,
  OpportunityDtoForUpdate,
} from "@/api/apiDtos";
import { toJsonPatch } from "@/utils/commonUtils";

export interface OpportunityState {
  data: OpportunityDto[];
  loading: boolean;
  error: string | null;
}

const initialState: OpportunityState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchOpportunities = createAsyncThunk<OpportunityDto[]>(
  "opportunity/fetchAll",
  async (newlist, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<OpportunityDto[]>>(
        "GET",
        URL + "/opportunity/getall",
        { Authorization: "Bearer " + state.login.accessToken }
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.statusCode !== 200
              ? "error"
              : response.isSuccess
              ? "success"
              : "warning",
        })
      );
      if(!response.isSuccess)   return rejectWithValue(response?.message);
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
export const addOpportunity = createAsyncThunk<
  OpportunityDtoForInsertion,
  Partial<OpportunityDtoForInsertion>
>(
  "opportunity/add",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<OpportunityDto>>(
        "POST",
        URL + "/opportunity/create",
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
export const updateOpportunity = createAsyncThunk<
  OpportunityDtoForUpdate,
  Partial<OpportunityDtoForUpdate>
>(
  "opportunity/update",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<OpportunityDto>>(
        "PUT",
        URL + "/opportunity/update",
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
export const patchOpportunity = createAsyncThunk<
  OpportunityDto,
  { id: number; changes: Partial<OpportunityDtoForUpdate> }
>(
  "opportunity/patch",
  async ({id,changes}, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      // Partial objeyi JSON Patch'e dönüştür
      const patchDoc = toJsonPatch<OpportunityDtoForUpdate>(changes);

      const response = await apiRequest<ApiResponseClient<OpportunityDto>>(
        "PATCH",
        URL + "/opportunity/patch/" + id,
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
export const deleteOpportunity = createAsyncThunk<number, number>(
  "opportunity/delete",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<OpportunityDto>>(
        "delete",
        URL + "/opportunity/delete" + "/" + id,
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

const opportunitySlice = createSlice({
  name: "opportunity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpportunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOpportunities.fulfilled,
        (state, action: PayloadAction<OpportunityDto[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
      .addCase(
        addOpportunity.fulfilled,
        (state, action: PayloadAction<OpportunityDto>) => {
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
      .addCase(updateOpportunity.fulfilled, (state, action: PayloadAction<OpportunityDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }).addCase(patchOpportunity.fulfilled, (state, action: PayloadAction<OpportunityDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(
        deleteOpportunity.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      );
  },
});

export default opportunitySlice.reducer;
