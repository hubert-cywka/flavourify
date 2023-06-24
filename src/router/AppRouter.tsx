import { Navigate } from 'react-router';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import ROUTE from './RoutingConstants';
import SecuredPath, { AccessType } from './SecuredPath';
import BottomNavbar from 'components/navbars/bottom-navbar/BottomNavbar';
import AuthenticationPage from 'pages/authentication/AuthenticationPage';
import DiscoverPage from 'pages/discover-page/DiscoverPage';
import ErrorPage from 'pages/error-page/ErrorPage';
import FoundDishPage from 'pages/found-dish-page/FoundDishPage';
import LandingPage from 'pages/landing-page/LandingPage';
import MenuPage from 'pages/menu-page/MenuPage';
import SettingsPage from 'pages/settings-page/SettingsPage';

const appRouter = createBrowserRouter([
  {
    path: ROUTE.LANDING,
    element: (
      <SecuredPath allowed={AccessType.AUTHENTICATED}>
        <>
          <Outlet /> <BottomNavbar />
        </>
      </SecuredPath>
    ),
    children: [
      {
        path: ROUTE.LANDING,
        element: <LandingPage />
      },
      {
        path: ROUTE.SETTINGS,
        element: <SettingsPage />
      },
      {
        path: ROUTE.WEEK_MENU,
        element: <MenuPage />
      },
      {
        path: ROUTE.FOUND_DISH,
        element: <FoundDishPage />
      },
      {
        path: ROUTE.DISCOVER,
        element: <DiscoverPage />
      }
    ]
  },
  {
    path: ROUTE.AUTH,
    element: (
      <SecuredPath allowed={AccessType.UNAUTHENTICATED}>
        <AuthenticationPage />
      </SecuredPath>
    )
  },
  {
    path: ROUTE.ERROR,
    element: <ErrorPage />
  },
  {
    path: '*',
    element: <Navigate to={{ pathname: ROUTE.ERROR }} state={{ status: 404 }} replace />
  }
]);

export default appRouter;
