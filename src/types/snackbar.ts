export interface ISnackbar {
    open: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    position: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
    autoHideDuration?: number; // Optional property for autoHideDuration
  }