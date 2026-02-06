import { ApiResponseClient } from "@/types/apiResponse";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import {
  URL,
} from "@/api";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "../store";
import { Enterprise } from "@/api/apiDtos";
import { toJsonPatch } from "@/utils/commonUtils";
import { GenericState } from "../genericSliceFactory";


const initialState: GenericState<Enterprise> = {
  items: [],
  loading: false,
  error: null,
};
export const fetchEnterprises = createAsyncThunk<Enterprise[]>(
  "enterprise/fetchAll",
  async (newlist, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<Enterprise[]>>(
        "GET",
        URL + "/enterprise/getall",
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
       if(!response.isSuccess)   return rejectWithValue(response?.message);
      return response.result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch(
        setNotification({
          message: errorMessage,
          title: "Enterprise Listeleme İşlemi Başarısız",
          type: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);
const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnterprises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEnterprises.fulfilled,
        (state, action: PayloadAction<Enterprise[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchEnterprises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      })
  },
});

export default enterpriseSlice.reducer;
