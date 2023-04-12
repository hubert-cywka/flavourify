import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { HighlightOffRounded } from '@mui/icons-material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const dismissSnackbar = (id: SnackbarKey) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton sx={{ color: '#ffffff' }} onClick={() => closeSnackbar(id)}>
      <HighlightOffRounded />
    </IconButton>
  );
};

interface AlertProviderProps {
  children: ReactJSXElement | ReactJSXElement[];
}
export const AlertProvider = ({ children }: AlertProviderProps) => {
  return (
    <SnackbarProvider
      action={(key) => dismissSnackbar(key)}
      maxSnack={3}
      preventDuplicate={true}
      variant="warning"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      {children}
    </SnackbarProvider>
  );
};
