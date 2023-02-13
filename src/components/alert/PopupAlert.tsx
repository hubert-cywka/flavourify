import { Alert, Snackbar, SnackbarProps } from '@mui/material';

interface PopupAlertProps {
  open: SnackbarProps['open'];
  onClose: SnackbarProps['onClose'];
  message: string;
  duration?: number;
  className?: string;
}

const PopupAlert = ({ open, onClose, message, duration, className }: PopupAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration ? duration : 5000}
      className={`popup-error-container ${className}`}
      onClose={onClose}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopupAlert;
