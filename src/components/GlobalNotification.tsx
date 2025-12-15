// src/components/GlobalError.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { clearNotification } from '../store/slices/notificationSlice';
import { Toast } from './Toast';

export const GlobalNotification: React.FC = () => {
  const { message, title, type, duration } = useSelector(
    (state: RootState) => state.notification
  );

  const dispatch = useDispatch();

  // ⛔ Artık hook'tan sonra koşullu dönüş yapıyoruz
  if (!message) return null;

  return (
    <Toast
      duration={duration}
      title={title ?? ""}
      message={message ?? ""}
      type={type ?? "success"}
      onClose={() => dispatch(clearNotification())}
    />
  );
};
