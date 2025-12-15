import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { init, login } from '../../services';
import { setNotification } from './notificationSlice';

export const loginData = createAsyncThunk(
  'login/loginData',
  async ({ data }, { rejectWithValue,dispatch }) => {
    try {
      const formData = { "userName": data.userName, "password": data.password }
      const response = await login(formData);

      if (response?.isSuccess && response?.statusCode === 200) {
        // await localStorage.setItem('auth', JSON.stringify({
        //   ...response.result.user,
        //   user: response.result.user,
        //   accessToken: response.result.accessToken,
        //   refreshToken: response.result.refreshToken,
        //   refreshTokenExpireTime: response.result.user.refreshTokenExpireTime
        // }));
        
        dispatch(setNotification({message: "Giriş Başarılı",title: "Başarılı"}));
        return response.result;
      } else {
        dispatch(setNotification({message: "Giriş Başarısız",title: "Başarısız","type":"warning"}));
        return rejectWithValue(response?.message || 'Giriş başarısız');
      }
    } catch (error:any) {
       dispatch(setNotification({message: error.message,title: "Hata","type":"error"}));
      return rejectWithValue(error?.message || 'Bağlantı hatası');
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'login/checkAuthState',
  async () => {
    try {
      const authData = await localStorage.getItem('auth');
      if (authData) {
        return JSON.parse(authData);
      }
      return null;
    } catch (error) {
      console.error('Auth durumu kontrol hatası:', error);
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'login/logoutUser',
  async () => {
    try {
     
      return true;
    } catch (error) {
      console.error('Çıkış hatası:', error);
      return false;
    }
  }
);
const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    status: 'idle',
    error: null,
    loginSuccess: false
  }
const loginSlice = createSlice({
  name: 'login',
  initialState:initialState ,
  reducers: {
    resetLoginSuccess: (state) => {
      state.user=null;
     state.accessToken= null,
    state.refreshToken= null,
    state.isLoggedIn= false,
    state.status= 'idle',
    state.error=null,
    state.loginSuccess= false
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginData.fulfilled,  (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.loginSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
         init();
      })
      .addCase(loginData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
        
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loginSuccess = false;
        state.status = 'idle';
      });
  },
});

export const { resetLoginSuccess } = loginSlice.actions;
export default loginSlice.reducer;