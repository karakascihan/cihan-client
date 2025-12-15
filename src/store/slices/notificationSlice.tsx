// src/store/errorSlice.ts
import { ToastProps } from '@/components/Toast';
import { createSlice,type  PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  message: string | null;
  title:string |null
  severity: string |null
}

const initialState: ToastProps = {
  title: '',
  message: ''

};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<ToastProps | null>) {
      state.message = action.payload?.message ??""; 
      state.title = action.payload?.title ?? ""; 
      state.type = action.payload?.type ?? "success"; 
      state.duration = action.payload?.duration ?? 5000
    ;
    },
    clearNotification(state) {
      state.message = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
