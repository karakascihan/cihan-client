import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "@/services/apiRequestService";
import { RootState } from "./store";
import { setNotification } from "./slices/notificationSlice";
import { URL } from "@/api";

export interface GenericState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}
interface GenericApiConfig<TInsert, TUpdate, TEntity> {
  name: string; // slice adı
  url: string; // API endpoint
  insertDto?: TInsert;
  updateDto?: TUpdate;
}

export function sliceBuilder<TInsert, TUpdate, TEntity>({
  name,
  url,
}: GenericApiConfig<TInsert, TUpdate, TEntity>) {
  const initialState: GenericState<TEntity> = {
    items: [],
    loading: false,
    error: null,
  };

  // -----------------------
  // FETCH ALL
  // -----------------------
  const fetchAll = createAsyncThunk<TEntity[], void, { state: RootState }>(
    `${name}/fetchAll`,
    async (_, { getState, dispatch, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const response = await apiRequest<{
          result: TEntity[];
          statusCode: number;
          message: string;
        }>("GET",  url + "/getall", { Authorization: `Bearer ${state.login.accessToken}` });
        dispatch(
          setNotification({
            title: response.message ?? "",
            message: " ",
            type: response.statusCode !== 200 ? "error" : "success",
          })
        );

        return response.result;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        dispatch(
          setNotification({
            title: "Listeleme Hatası",
            message: msg,
            type: "error",
          })
        );
        return rejectWithValue(msg);
      }
    }
  );

  // -----------------------
  // CREATE
  // -----------------------
  const createEntity = createAsyncThunk<TEntity, TInsert, { state: RootState }>(
    `${name}/create`,
    async (data, { getState, dispatch, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const response = await apiRequest<{
          result: TEntity;
          statusCode: number;
          message: string;
        }>(
          "POST",
          url + "/create",
          { Authorization: `Bearer ${state.login.accessToken}` },
          data
        );

        dispatch(
          setNotification({
            title: "Kayıt Eklendi",
            message: response.message ?? "",
            type: "success",
          })
        );

        return response.result;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        dispatch(
          setNotification({
            title: "Kayıt Eklenemedi",
            message: msg,
            type: "error",
          })
        );
        return rejectWithValue(msg);
      }
    }
  );

  // -----------------------
  // UPDATE
  // -----------------------
  const updateEntity = createAsyncThunk<
    TEntity,
    { id: number; data: TUpdate },
    { state: RootState }
  >(
    `${name}/update`,
    async ({ id, data }, { getState, dispatch, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const response = await apiRequest<{
          result: TEntity;
          statusCode: number;
          message: string;
        }>(
          "PUT",
          `${url}/update/${id}`,
          { Authorization: `Bearer ${state.login.accessToken}` },
          data
        );

        dispatch(
          setNotification({
            title: "Kayıt Güncellendi",
            message: response.message ?? "",
            type: "success",
          })
        );

        return response.result;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        dispatch(
          setNotification({
            title: "Güncelleme Hatası",
            message: msg,
            type: "error",
          })
        );
        return rejectWithValue(msg);
      }
    }
  );

  // -----------------------
  // DELETE
  // -----------------------
  const deleteEntity = createAsyncThunk<number, number, { state: RootState }>(
    `${name}/delete`,
    async (id, { getState, dispatch, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const response = await apiRequest<{
          statusCode: number;
          message: string;
        }>("DELETE", `${url}/delete/${id}`, {
          Authorization: `Bearer ${state.login.accessToken}`,
        });

        dispatch(
          setNotification({
            title: "Kayıt Silindi",
            message: response.message ?? "",
            type: "success",
          })
        );

        return id;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        dispatch(
          setNotification({
            title: "Silme Hatası",
            message: msg,
            type: "error",
          })
        );
        return rejectWithValue(msg);
      }
    }
  );

  // -----------------------
  // Slice
  // -----------------------
  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // FETCH
        .addCase(fetchAll.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(
          fetchAll.fulfilled,
          (state, action: PayloadAction<TEntity[]>) => {
            state.loading = false;
            state.items = action.payload;
          }
        )
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        // CREATE
        .addCase(
          createEntity.fulfilled,
          (state, action: PayloadAction<TEntity>) => {
            state.items.unshift(action.payload);
          }
        )

        // UPDATE
        .addCase(
          updateEntity.fulfilled,
          (state, action: PayloadAction<TEntity>) => {
            const index = state.items.findIndex(
              (x) => (x as any).id === (action.payload as any).id
            );
            if (index !== -1) state.items[index] = action.payload;
          }
        )

        // DELETE
        .addCase(
          deleteEntity.fulfilled,
          (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
              (x) => (x as any).id !== action.payload
            );
          }
        );
    },
  });

  return {
    reducer: slice.reducer,
    actions: {
      fetchAll,
      createEntity,
      updateEntity,
      deleteEntity,
    },
  };
}
