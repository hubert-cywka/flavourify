import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { HighlightOffRounded } from '@mui/icons-material';
import { setupInterceptors } from './services/ApiClient';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const dismissSnackbar = (id: SnackbarKey) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton sx={{ color: '#ffffff' }} onClick={() => closeSnackbar(id)}>
      <HighlightOffRounded />
    </IconButton>
  );
};

setupInterceptors();

root.render(
  <React.StrictMode>
    <SnackbarProvider
      action={(key) => dismissSnackbar(key)}
      maxSnack={3}
      preventDuplicate={true}
      variant="warning"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
