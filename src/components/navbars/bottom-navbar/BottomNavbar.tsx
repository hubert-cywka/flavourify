import { BottomNavigationAction, BottomNavigation, Box } from '@mui/material';
import ROUTE from '../../router/RoutingConstants';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import './BottomNavbar.scss';
import { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const BottomNavbar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const navigate = useNavigate();

  const navigateTo = (_event: SyntheticEvent<Element, Event>, newPath: string) => {
    setPath(newPath);
    navigate(newPath);
  };

  return (
    <Box className="bottom-navbar-container">
      <BottomNavigation
        value={path}
        onChange={navigateTo}
        sx={{
          bgcolor: 'secondary.main',
          color: 'text.secondary'
        }}>
        <BottomNavigationAction
          className="navbar-tile"
          label="Recipes"
          value={ROUTE.LANDING}
          icon={<ReceiptLongRoundedIcon />}
          sx={{ '&.Mui-selected': { color: 'accent.main' } }}
        />
        <BottomNavigationAction
          className="navbar-tile"
          label="Discover"
          value={ROUTE.DISCOVER}
          icon={<TravelExploreRoundedIcon />}
          sx={{ '&.Mui-selected': { color: 'accent.main' } }}
        />
        <BottomNavigationAction
          className="navbar-tile"
          label="Menu"
          value={ROUTE.WEEK_MENU}
          icon={<RestaurantMenuRoundedIcon />}
          sx={{ '&.Mui-selected': { color: 'accent.main' } }}
        />
        <BottomNavigationAction
          className="navbar-tile"
          label="Settings"
          value={ROUTE.SETTINGS}
          icon={<SettingsApplicationsRoundedIcon />}
          sx={{ '&.Mui-selected': { color: 'accent.main' } }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavbar;
