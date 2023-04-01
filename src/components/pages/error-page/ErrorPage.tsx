import AppRouter from '../../router/AppRouter';
import StatusScreen from '../../status-screen/StatusScreen';
import appRouter from '../../router/AppRouter';
import ROUTE from '../../router/RoutingConstants';
import { ERROR_403_IMAGE, ERROR_404_IMAGE, ERROR_500_IMAGE } from '../../../constants/AppConstants';
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
        return 'Forbidden.';
      case 404:
        return 'Page not found.';
      default:
        return 'Something went wrong';
    }
  };

  const getErrorInfo = (): string => {
    switch (error.status) {
      case 403:
        return 'You are not allowed to access this resource.';
      case 404:
        return 'This page does not exist. You should not be here.';
      default:
        return 'It is our fault, sorry. Please try again later';
    }
  };

  const buildStatusScreen = () => {
    if (hasUserPermission()) {
      return (
        <StatusScreen
          open={true}
          close={() => appRouter.navigate(-1)}
          closeText={'Go back'}
          buttonOnClick={() => appRouter.navigate(ROUTE.LANDING)}
          buttonText={'Go to home page'}
          header={getErrorHeader()}
          imgSource={getErrorImageSrc()}
          info={getErrorInfo()}
          status={'error'}></StatusScreen>
      );
    } else {
      return (
        <StatusScreen
          open={true}
          close={() => appRouter.navigate(ROUTE.AUTH)}
          closeText={'Sign in'}
          header={getErrorHeader()}
          imgSource={getErrorImageSrc()}
          info={getErrorInfo()}
          status={'error'}></StatusScreen>
      );
    }
  };

  return error?.status ? buildStatusScreen() : <Navigate to={ROUTE.LANDING} replace />;
};
export default ErrorPage;
