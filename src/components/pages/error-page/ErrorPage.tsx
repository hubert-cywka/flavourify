import AppRouter from '../../router/AppRouter';
import StatusScreen from '../../status-screen/StatusScreen';
import appRouter from '../../router/AppRouter';
import ROUTE from '../../router/RoutingConstants';
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
} from '../../../constants/AppConstants';
import { hasUserPermission } from '../../../services/AuthService';
import { Navigate } from 'react-router';

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
    if (hasUserPermission()) {
      return (
        <StatusScreen
          open={true}
          close={() => appRouter.navigate(-1)}
          buttonText={'Go back'}
          secondButtonOnClick={() => appRouter.navigate(ROUTE.LANDING)}
          secondButtonText={'Go to home page'}
          header={getErrorHeader()}
          imgSource={getErrorImageSrc()}
          caption={getErrorInfo()}
          status={'error'}></StatusScreen>
      );
    } else {
      return (
        <StatusScreen
          open={true}
          close={() => appRouter.navigate(ROUTE.AUTH)}
          buttonText={'Sign in'}
          header={getErrorHeader()}
          imgSource={getErrorImageSrc()}
          caption={getErrorInfo()}
          status={'error'}></StatusScreen>
      );
    }
  };

  return error?.status ? buildStatusScreen() : <Navigate to={ROUTE.LANDING} replace />;
};
export default ErrorPage;
