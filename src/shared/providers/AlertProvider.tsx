import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { SnackbarProvider } from 'notistack';
import Toast from 'components/toast/Toast';

interface AlertProviderProps {
  children: ReactJSXElement | ReactJSXElement[];
}
export const AlertProvider = ({ children }: AlertProviderProps) => {
  return (
    <SnackbarProvider
      Components={{
        success: Toast,
        error: Toast,
        warning: Toast,
        info: Toast
      }}
      maxSnack={4}
      preventDuplicate={true}
      variant="warning"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      {children}
    </SnackbarProvider>
  );
};
