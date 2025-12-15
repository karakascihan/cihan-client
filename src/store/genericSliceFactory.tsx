import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Dispatch,
  Draft,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { setNotification } from "./slices/notificationSlice";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponseClient } from "@/types/apiResponse";
import { URL } from "@/api";
import { ErrorOption } from "react-hook-form";
import { get } from "http";

export interface GenericState<T> {
  items: T[];
  loading: boolean;
  error: string | null;

}

export function createGenericSlice<T extends { id: number | string }>(
  name: string,
  baseUrl: string
): {
  reducer: (state: GenericState<T> | undefined, action: any) => GenericState<T>;
  actions: {
    clearItems: () => { payload: undefined; type: string };
    fetchAll: any;
    createItem: any;
    updateItem: any;
    deleteItem: any;
  
  };
} {
  const fetchAll = createAsyncThunk<
    T[],
    void,
    {
      state: RootState;
      dispatch: Dispatch;
      rejectValue: string;
    }
  >(`${name}/fetchAll`, async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState();
      let endpoint="/getall";
      if (name==="personel") {
        endpoint="/GetAllWithEducations";
      }
      const response = await apiRequest<ApiResponseClient<T[]>>(
        "GET",
        URL + baseUrl+endpoint,
        { Authorization: `Bearer ${state.login.accessToken}` }
      );
      
      // dispatch(setLoading(false));
      dispatch(
        setNotification({
          title: "Başarılı",
          message: response?.message ?? "",
          type:
            response.statusCode === 500
              ? "error"
              : response.isSuccess
              ? "success"
              : "warning",
        })
      );

      return response.result;
    } catch (error: any) {
      dispatch(
        setNotification({
          title: "Listeleme İşlemi Başarısız",
          message: error?.message || "Bilinmeyen hata",
          type: "error",
        })
      );
      return rejectWithValue("Listeleme hatası");
    }
  });

  // Create
  const createItem2 = createAsyncThunk<T, T, { rejectValue: string }>(
    `${name}/create`,
    async (item, { rejectWithValue }) => {
      try {
        const response = await axios.post<T>(baseUrl, item);
        return response.data;
      } catch {
        return rejectWithValue("Oluşturma hatası");
      }
    }
  );
  // 📌 Ekleme
  const createItem = createAsyncThunk<T, Partial<T>>(
    `${name}/add`,
    async (newLeave, { rejectWithValue, dispatch, getState }) => {
      try {
        const state = getState() as RootState;

        const response = await apiRequest<ApiResponseClient<T>>(
          "POST",
          URL + baseUrl + "/create",
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
      } catch (error:any) {
        dispatch(
          setNotification({
            message: error.message,
            title: "Kayıt İşlemi Başarısız",
            type: "error",
          })
        );
        return rejectWithValue(error);
      }
    }
  );
  // Update
  const updateItem = createAsyncThunk<T, T, { rejectValue: string }>(
    `${name}/update`,
    async (item, { rejectWithValue }) => {
      try {
        const response = await axios.put<T>(`${baseUrl}/${item.id}`, item);
        return response.data;
      } catch {
        return rejectWithValue("Güncelleme hatası");
      }
    }
  );

  // Delete
  const deleteItem2 = createAsyncThunk<
    number | string,
    number | string,
    { rejectValue: string }
  >(`${name}/delete`, async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      return id;
    } catch {
      return rejectWithValue("Silme hatası");
    }
  });
  // 📌 Silme
  const deleteItem = createAsyncThunk<number, number>(
    `${name}/delete`,
    async (id, { dispatch, rejectWithValue, getState }) => {
      try {
        const state = getState() as RootState;
        const response = await apiRequest<ApiResponseClient<T>>(
          "delete",
          URL + baseUrl + "/delete/" + id,
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
      } catch (error:any) {
        dispatch(
          setNotification({
            message: error.message,
            title: "Silme İşlemi Başarısız",
            type: "error",
          })
        );
        return rejectWithValue(error);
      }
    }
  );

  // Initial State
  const initialState: GenericState<T> = {
    items: [],
    loading: false,
    error: null,
  };

  // Slice
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearItems: (state) => {
        state.items = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAll.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.loading = false;
          state.items = action.payload as Draft<T>[];
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message || "Fetch error";
        })

        .addCase(createItem.fulfilled, (state, action: PayloadAction<T>) => {
          if (action.payload.id && action.payload.id !== 0) {
            const index = state.items.findIndex(
              (i) => i.id === action.payload.id
            );
            if (index !== -1) state.items[index] = action.payload as Draft<T>;
            else {
            state.items.unshift(action.payload as Draft<T>);
          }
          } else {
            state.items.unshift(action.payload as Draft<T>);
          }
        })

        .addCase(updateItem.fulfilled, (state, action: PayloadAction<T>) => {
          const index = state.items.findIndex(
            (i) => i.id === action.payload.id
          );
          if (index !== -1) state.items[index] = action.payload as Draft<T>;
        })

        .addCase(
          deleteItem.fulfilled,
          (state, action: PayloadAction<number | string>) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
          }
        );
    },
  });

  return {
    reducer: slice.reducer,
    actions: {
      ...slice.actions,
      fetchAll,
      createItem,
      updateItem,
      deleteItem,
    },
  };
}
