import { createBrowserRouter, Outlet } from 'react-router-dom';
import LandingPage from '../pages/landing-page/LandingPage';
import SettingsPage from '../pages/settings-page/SettingsPage';
import MenuPage from '../pages/menu-page/MenuPage';
import FoundDishPage from '../pages/found-dish-page/FoundDishPage';
import BottomNavbar from '../navbars/bottom-navbar/BottomNavbar';
import DiscoverPage from '../pages/discover-page/DiscoverPage';
import ROUTE from './RoutingConstants';

const appRouter = createBrowserRouter([
  {
    path: ROUTE.LANDING,
    element: (
      <>
        <Outlet /> <BottomNavbar />
      </>
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
  }
]);

export default appRouter;
