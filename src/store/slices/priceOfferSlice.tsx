import { ApiResponseClient } from "@/types/apiResponse";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import { URL } from "@/api";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "../store";
import {
  PriceOfferDto,
  PriceOfferDtoForInsertion,
  PriceOfferDtoForUpdate,
  PriceOfferType,
} from "@/api/apiDtos";
import { toJsonPatch } from "@/utils/commonUtils";

export interface PriceOfferState {
  data: PriceOfferDto[];
  loading: boolean;
  error: string | null;
}

const initialState: PriceOfferState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchPriceOffers = createAsyncThunk<PriceOfferDto[], { priceOfferType: PriceOfferType }>(
  "priceoffer/fetchAll",
  async (priceOfferType, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<PriceOfferDto[]>>(
        "GET",
        URL + "/priceoffer/getall/" + priceOfferType.priceOfferType,
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
      if (!response.isSuccess) return rejectWithValue(response?.message);

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
export const addPriceOffer = createAsyncThunk<
  PriceOfferDtoForInsertion,
  { newLeave: Partial<PriceOfferDtoForUpdate>, isRevision?: boolean }
>(
  "priceoffer/add",
  async ({ newLeave, isRevision }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<PriceOfferDto>>(
        "POST",
        URL + "/priceoffer/create" + (isRevision ? "?isRevision=true" : ""),
        { Authorization: "Bearer " + state.login.accessToken },
        newLeave
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.statusCode === 0
              ? "success"
              : "error",
        })
      );
      if (!response.isSuccess) return rejectWithValue(response?.message);
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
export const updatePriceOffer = createAsyncThunk<
  PriceOfferDtoForUpdate, { id: number; changes: Partial<PriceOfferDtoForUpdate> }

>(
  "priceoffer/update",
  async ({ id, changes }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<PriceOfferDto>>(
        "PUT",
        URL + "/priceoffer/update/" + id,
        { Authorization: "Bearer " + state.login.accessToken },
        changes
      );
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: response.result ? " " : " ",
          type:
            response.statusCode === 4
              ? "error"
              : response.isSuccess
                ? "success"
                : "warning",
        })
      );
      if (!response.isSuccess) return rejectWithValue(response?.message);

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
export const patchPriceOffer = createAsyncThunk<
  PriceOfferDto,
  { id: number; changes: Partial<PriceOfferDtoForUpdate> }
>(
  "priceoffer/patch",
  async ({ id, changes }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      // Partial objeyi JSON Patch'e dönüştür
      const patchDoc = toJsonPatch<PriceOfferDtoForUpdate>(changes);

      const response = await apiRequest<ApiResponseClient<PriceOfferDto>>(
        "PATCH",
        URL + "/priceoffer/patch/" + id,
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
      if (!response.isSuccess) return rejectWithValue(response?.message);

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
export const deletePriceOffer = createAsyncThunk<number, number>(
  "priceoffer/delete",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<PriceOfferDto>>(
        "delete",
        URL + "/priceoffer/delete" + "/" + id,
        { Authorization: "Bearer " + state.login.accessToken }
      );
      if (!response.isSuccess) throw new Error(response.result as unknown as string);
      dispatch(
        setNotification({
          title: response?.message ?? "",
          message: " ",
          type:
            response.isSuccess
              ? "success"
              : "warning",
        })
      );
      if (!response.isSuccess) return rejectWithValue(response?.message);

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

const priceofferSlice = createSlice({
  name: "priceoffer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPriceOffers.fulfilled,
        (state, action: PayloadAction<PriceOfferDto[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPriceOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
      .addCase(
        addPriceOffer.fulfilled,
        (state, action: PayloadAction<PriceOfferDto>) => {
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
      .addCase(updatePriceOffer.fulfilled, (state, action: PayloadAction<PriceOfferDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }).addCase(patchPriceOffer.fulfilled, (state, action: PayloadAction<PriceOfferDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(
        deletePriceOffer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      );
  },
});

export default priceofferSlice.reducer;
