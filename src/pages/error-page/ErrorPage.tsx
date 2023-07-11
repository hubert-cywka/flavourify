import { Navigate } from 'react-router';
import {
  ERROR_403_CAPTION,
  ERROR_403_HEADER,
  ERROR_403_IMAGE,
  ERROR_404_CAPTION,
  ERROR_404_HEADER,
  ERROR_404_IMAGE,
  ERROR_500_CAPTION,
  ERROR_500_HEADER,
  ERROR_500_IMAGE
} from 'shared/constants/AppConstants';
import { hasUserPermission } from 'services/AuthService';
import AppRouter from 'router/AppRouter';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import StatusScreen from 'components/status-screen/StatusScreen';

const ErrorPage = () => {
  const error = AppRouter.state.location.state;
  const getErrorImageSrc = (): string => {
    switch (error.status) {
      case 403:
        return ERROR_403_IMAGE;
      case 404:
        return ERROR_404_IMAGE;
      default:
        return ERROR_500_IMAGE;
    }
  };

  const getErrorHeader = (): string => {
    switch (error.status) {
      case 403:
        return ERROR_403_HEADER;
      case 404:
        return ERROR_404_HEADER;
      default:
        return ERROR_500_HEADER;
    }
  };

  const getErrorInfo = (): string => {
    switch (error.status) {
      case 403:
        return ERROR_403_CAPTION;
      case 404:
        return ERROR_404_CAPTION;
      default:
        return ERROR_500_CAPTION;
    }
  };

  const buildStatusScreen = () => {
    const isExtended = hasUserPermission();
    const onClose = isExtended
      ? () => appRouter.navigate(-1)
      : () => appRouter.navigate(ROUTE.AUTH);
    const buttonText = isExtended ? 'Go back' : 'Sign in';
    const onSecondButtonClick = isExtended ? () => appRouter.navigate(ROUTE.LANDING) : undefined;
    const secondButtonText = isExtended ? 'Go to home page' : undefined;

    return (
      <StatusScreen
        open={true}
        close={onClose}
        buttonText={buttonText}
        secondButtonOnClick={onSecondButtonClick}
        secondButtonText={secondButtonText}
        header={getErrorHeader()}
        imgSource={getErrorImageSrc()}
        caption={getErrorInfo()}
        status="error"
      />
    );
  };

  return error?.status ? buildStatusScreen() : <Navigate to={ROUTE.LANDING} replace />;
};

export default ErrorPage;
