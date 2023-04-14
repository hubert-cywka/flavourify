import { SnackbarProvider } from 'notistack';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import CustomAlert from './components/custom-alert/CustomAlert';

interface AlertProviderProps {
  children: ReactJSXElement | ReactJSXElement[];
}
export const AlertProvider = ({ children }: AlertProviderProps) => {
  return (
    <SnackbarProvider
      Components={{
        success: CustomAlert,
        error: CustomAlert,
        warning: CustomAlert,
        info: CustomAlert
      }}
      maxSnack={4}
      preventDuplicate={true}
      variant="warning"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      {children}
    </SnackbarProvider>
  );
};
