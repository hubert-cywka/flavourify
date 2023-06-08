import { Box, Fade } from '@mui/material';
import './TopNavbar.scss';
import { useSpring } from '@react-spring/web';
import { animated } from 'react-spring';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded } from '@mui/icons-material';
import { useState } from 'react';
import { hasAdminPermission } from '../../../services/AuthService';
import DishCardAddDialog from '../../dishes/dish-card/other-variants/dish-card-add/DishCardAddDialog';
import appRouter from '../../../router/AppRouter';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DisplayedTag from '../../tags/displayed-tag/DisplayedTag';

interface TopNavbarProps {
  className?: string;
  singleDishVariant?: boolean;
  searchValue?: string;
}

const TopNavbar = ({ className, singleDishVariant, searchValue }: TopNavbarProps) => {
  const [isFocusOnSearchBar, setIsFocusOnSearchBar] = useState(false);
  const [isDishAddDialogVisible, setIsDishAddDialogVisible] = useState(false);

  const transition = useSpring({
    width: isFocusOnSearchBar ? '0%' : '50%'
  });

  const getStandardButtons = () => {
    return (
      <>
        <DisplayedTag className="displayed-tag" />
        {hasAdminPermission() && (
          <AddRoundedIcon
            sx={{ color: 'secondary.main' }}
            className="add-dish-button"
            onClick={() => setIsDishAddDialogVisible(true)}
          />
        )}
      </>
    );
  };

  const getBackButton = () => {
    return (
      <ArrowBackRounded
        className="back-button"
        sx={{ color: 'secondary.main' }}
        onClick={() => appRouter.navigate(-1)}
      />
    );
  };

  const buildButtons = () => {
    return (
      <animated.div className="top-navbar-buttons" style={transition}>
        {!singleDishVariant ? getStandardButtons() : getBackButton()}
      </animated.div>
    );
  };

  return (
    <Box className={`top-navbar-container ${className ?? ''}`}>
      <SearchBar
        searchValue={searchValue}
        className={`search-bar ${isFocusOnSearchBar ? 'active' : ''}`}
        onBlur={() => setIsFocusOnSearchBar(false)}
        onFocus={() => setIsFocusOnSearchBar(true)}
      />
      {buildButtons()}

      <Fade in={isDishAddDialogVisible} unmountOnExit={true} mountOnEnter={true}>
        <Box>
          <DishCardAddDialog
            open={isDishAddDialogVisible}
            onClose={() => setIsDishAddDialogVisible(false)}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default TopNavbar;
