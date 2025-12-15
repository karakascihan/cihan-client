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
import { toJsonPatch } from "@/utils/commonUtils";
import { GenericState } from "../genericSliceFactory";
import { PersonelDto } from "@/api/apiDtos";



const initialState: GenericState<PersonelDto> = {
  items: [],
  loading: false,
  error: null,
};
export const fetchpersonels = createAsyncThunk<PersonelDto[],{onlyNames:boolean,isActive:boolean}>(
  "personel/fetchAll",
  async ({onlyNames,isActive}, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
     const response = await apiRequest<ApiResponseClient<PersonelDto[]>>(
  "GET",
  URL + `/personel/getall?onlyNames=${onlyNames ? "true" : "false"}&isActive=${isActive ? "true" : "false"}`,
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
// -----------------------
// PERSONEL CREATE
// -----------------------
export const createPersonel = createAsyncThunk<
  PersonelDto,
  PersonelDto,
  { rejectValue: string }
>("personel/create", async (personel, { dispatch, getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;

    const response = await apiRequest<ApiResponseClient<PersonelDto>>(
      "POST",
      URL + "/personel/create",
      { Authorization: "Bearer " + state.login.accessToken },
      personel
    );

    dispatch(setNotification({
      title: "Personel Eklendi",
      message: response.message ?? "",
      type: "success",
    }));

    return response.result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dispatch(setNotification({
      title: "Personel eklenemedi",
      message,
      type: "error"
    }));
    return rejectWithValue(message);
  }
});


// -----------------------
// PERSONEL UPDATE
// -----------------------
export const updatePersonel = createAsyncThunk<
  PersonelDto,
  { id: number; data: PersonelDto },
  { rejectValue: string }
>("personel/update", async ({ id, data }, { dispatch, getState, rejectWithValue }) => {

  try {
    const state = getState() as RootState;
    const patchData = toJsonPatch(data); // JSON PATCH kullanıyorsan

    const response = await apiRequest<ApiResponseClient<PersonelDto>>(
      "PATCH",
      URL + `/personel/${id}`,
      { Authorization: "Bearer " + state.login.accessToken },
      patchData
    );

    dispatch(setNotification({
      title: "Personel Güncellendi",
      message: response.message ?? "",
      type: "success",
    }));

    return response.result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dispatch(setNotification({
      title: "Güncelleme hatası",
      message,
      type: "error",
    }));
    return rejectWithValue(message);
  }
});


// -----------------------
// PERSONEL DELETE
// -----------------------
export const deletePersonel = createAsyncThunk<
  number,            // reducer’a dönen değer → silinen ID
  number,            // parametre → id
  { rejectValue: string }
>("personel/delete", async (id, { dispatch, getState, rejectWithValue }) => {

  try {
    const state = getState() as RootState;

    const response = await apiRequest<ApiResponseClient<any>>(
      "DELETE",
      URL + `/personel/${id}`,
      { Authorization: "Bearer " + state.login.accessToken }
    );

    dispatch(setNotification({
      title: "Personel Silindi",
      message: response.message ?? "",
      type: "success"
    }));

    return id;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dispatch(setNotification({
      title: "Silme hatası",
      message,
      type: "error"
    }));
    return rejectWithValue(message);
  }
});

const personelSlice = createSlice({
  name: "personel",
  initialState,
  reducers: {},
 extraReducers: (builder) => {
  builder
    // LIST
    .addCase(fetchpersonels.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchpersonels.fulfilled, (state, action: PayloadAction<PersonelDto[]>) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchpersonels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Veri alınamadı";
    })


    // CREATE
    .addCase(createPersonel.fulfilled, (state, action) => {
      state.items.push(action.payload);
    })

    // UPDATE
    .addCase(updatePersonel.fulfilled, (state, action) => {
      const index = state.items.findIndex(x => x.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    })

    // DELETE
    .addCase(deletePersonel.fulfilled, (state, action) => {
      state.items = state.items.filter(x => x.id !== action.payload);
    });
}

});

export default personelSlice.reducer;
