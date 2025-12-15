import { UserDtoForCrm } from "@/api/apiDtos";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponseClient } from "@/types/apiResponse";
import { setNotification } from "./notificationSlice";
import { URL } from "@/api";

export interface UserState {
  data: UserDtoForCrm[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchUsers = createAsyncThunk<UserDtoForCrm[]>(
  "user/fetchAll",
  async (newlist, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiRequest<ApiResponseClient<UserDtoForCrm[]>>(
        "GET",
        URL + "/user/getallbycrm",
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
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserDtoForCrm[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Veri alınamadı";
      });
  },
});

export default userSlice.reducer;
