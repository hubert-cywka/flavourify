import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Navigate } from 'react-router';
import ROUTE from './RoutingConstants';
import { hasAdminPermission, hasUserPermission } from 'services/AuthService';

interface SecuredPathProps {
  children: ReactJSXElement;
  allowed: AccessType;
}

export enum AccessType {
  AUTHENTICATED, // eslint-disable-line no-unused-vars
  UNAUTHENTICATED, // eslint-disable-line no-unused-vars
  ADMIN // eslint-disable-line no-unused-vars
}
const SecuredPath = ({ allowed, children }: SecuredPathProps) => {
  const getReplacedPath = (): ReactJSXElement => {
    switch (allowed) {
      case AccessType.AUTHENTICATED:
        return <Navigate to={ROUTE.AUTH} replace />;
      case AccessType.UNAUTHENTICATED:
        return <Navigate to={ROUTE.LANDING} replace />;
      case AccessType.ADMIN:
        return <Navigate to={ROUTE.LANDING} replace />;
    }
  };

  const isPermitted = () => {
    switch (allowed) {
      case AccessType.AUTHENTICATED:
        return hasUserPermission();
      case AccessType.UNAUTHENTICATED:
        return !hasUserPermission();
      case AccessType.ADMIN:
        return hasAdminPermission();
    }
  };

  return isPermitted() ? children : getReplacedPath();
};
export default SecuredPath;
