import { BottomNavigationAction, BottomNavigation, Box } from '@mui/material';
import ROUTE from 'router/RoutingConstants';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import './BottomNavbar.scss';
import { memo, SyntheticEvent, useEffect, useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useLocation, useNavigate } from 'react-router';

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

  const navigationCommonProps = () => {
    return {
      className: 'navbar-tile',
      sx: { color: 'text.primary', '&.Mui-selected': { color: 'accent.main' } }
    };
  };

  return (
    <Box component="header" className="bottom-navbar-container">
      <BottomNavigation value={path} onChange={navigateTo} sx={{ bgcolor: 'secondary.main' }}>
        <BottomNavigationAction
          label="Recipes"
          value={ROUTE.LANDING}
          icon={<ReceiptLongRoundedIcon />}
          {...navigationCommonProps()}
        />
        <BottomNavigationAction
          label="Menu"
          value={ROUTE.WEEK_MENU}
          icon={<RestaurantMenuRoundedIcon />}
          {...navigationCommonProps()}
        />
        <BottomNavigationAction
          label="Discover"
          value={ROUTE.DISCOVER}
          icon={<TravelExploreRoundedIcon />}
          {...navigationCommonProps()}
        />
        <BottomNavigationAction
          label="Settings"
          value={ROUTE.SETTINGS}
          icon={<AccountCircleRoundedIcon />}
          {...navigationCommonProps()}
        />
      </BottomNavigation>
    </Box>
  );
};

export default memo(BottomNavbar);
