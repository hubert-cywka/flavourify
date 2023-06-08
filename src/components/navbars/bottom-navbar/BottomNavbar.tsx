import { BottomNavigationAction, BottomNavigation, Box } from '@mui/material';
import ROUTE from '../../../router/RoutingConstants';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import './BottomNavbar.scss';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useLocation, useNavigate } from 'react-router';
import { To } from 'react-router-dom';

const BottomNavbar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const navigateTo = (_event: SyntheticEvent, newPath: string) => {
    setPath(newPath);
    navigate(newPath);
  };

  const buildNavigationTile = (icon: ReactJSXElement, label: string, route: To) => {
    return (
      <BottomNavigationAction
        className="navbar-tile"
        label={label}
        value={route}
        icon={icon}
        sx={{ color: 'text.primary', '&.Mui-selected': { color: 'accent.main' } }}
      />
    );
  };

  return (
    <Box className="bottom-navbar-container">
      <BottomNavigation value={path} onChange={navigateTo} sx={{ bgcolor: 'secondary.main' }}>
        {buildNavigationTile(<ReceiptLongRoundedIcon />, 'Recipes', ROUTE.LANDING)}
        {buildNavigationTile(<RestaurantMenuRoundedIcon />, 'Menu', ROUTE.WEEK_MENU)}
        {buildNavigationTile(<TravelExploreRoundedIcon />, 'Discover', ROUTE.DISCOVER)}
        {buildNavigationTile(<AccountCircleRoundedIcon />, 'Settings', ROUTE.SETTINGS)}
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavbar;
