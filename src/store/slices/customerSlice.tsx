import { ApiResponseClient } from "@/types/apiResponse";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import {URL} from "@/api";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "../store";
import {
  CustomerDto,
  CustomerDtoForInsertion,
  CustomerDtoForUpdate,
} from "@/api/apiDtos";
import { toJsonPatch } from "@/utils/commonUtils";

export interface CustomerState {
  data: CustomerDto[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchCustomers = createAsyncThunk<CustomerDto[]>(
  "customer/fetchAll",
  async (newlist, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<CustomerDto[]>>(
        "GET",
        URL + "/customer/getall?tip=0",
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
          title: "Müşteri Listeleme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);
// 📌 Ekleme
export const addCustomer = createAsyncThunk<
  CustomerDto,
  Partial<CustomerDtoForInsertion>
>(
  "customer/add",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<CustomerDto>>(
        "POST",
        URL + "/customer/create",
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
          title: "Müşteri Kayıt İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);
// 📌 Güncelleme
export const updateCustomer = createAsyncThunk<
  CustomerDto,
  Partial<CustomerDtoForUpdate>
>(
  "customer/update",
  async (newLeave, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<CustomerDto>>(
        "put",
        URL + "/customer/update",
        { Authorization: "Bearer " + state.login.accessToken },
        newLeave
      );
      dispatch(
        setNotification({
          title: response?.message ?? "Başlık",
          duration:500000,
          message:response.result,
          type:
            response.statusCode === 4
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
export const patchCustomer = createAsyncThunk<
  CustomerDto,
  { id: number; changes: Partial<CustomerDtoForUpdate> }
>(
  "customer/patch",
  async ({id,changes}, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      // Partial objeyi JSON Patch'e dönüştür
      const patchDoc = toJsonPatch<CustomerDtoForUpdate>(changes);

      const response = await apiRequest<ApiResponseClient<CustomerDto>>(
        "PATCH",
        URL + "/customer/patch/" + id,
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
export const deleteCustomer = createAsyncThunk<number, number>(
  "customer/delete",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<CustomerDto>>(
        "delete",
        URL + "/customer/delete" + "/" + id,
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
          title: "Müşteri Silme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<CustomerDto[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
      .addCase(
        addCustomer.fulfilled,
        (state, action: PayloadAction<CustomerDto>) => {
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
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<CustomerDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }).addCase(patchCustomer.fulfilled, (state, action: PayloadAction<CustomerDto>) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(
        deleteCustomer.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      );
  },
});

export default customerSlice.reducer;
