import { Box } from '@mui/material';
import './TopNavbar.scss';
import DisplayedTag from '../../tags/displayed-tag/DisplayedTag';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded } from '@mui/icons-material';
import { useState } from 'react';
import appRouter from '../../router/AppRouter';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DishCardAddDialog from '../../dishes/dish-card/other-variants/dish-card-add/DishCardAddDialog';
import { hasAdminPermission } from '../../../services/AuthService';
import { animated } from 'react-spring';
import { useSpring } from '@react-spring/web';

interface TopNavbarProps {
  className?: string;
  singleDishVariant?: boolean;
  searchValue?: string;
}

const TopNavbar = ({ className, singleDishVariant, searchValue }: TopNavbarProps) => {
  const [isFocusOnSearchBar, setIsFocusOnSearchBar] = useState(false);
  const [isDishAddDialogVisible, setIsDishAddDialogVisible] = useState(false);

  const transition = useSpring({
    width: isFocusOnSearchBar ? '0%' : '60%'
  });

  const getButtons = () => {
    return (
      <animated.div className="top-navbar-buttons" style={transition}>
        {!singleDishVariant ? (
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
        ) : (
          <ArrowBackRounded
            className="back-button"
            sx={{ color: 'secondary.main' }}
            onClick={() => appRouter.navigate(-1)}
          />
        )}
      </animated.div>
    );
  };

  return (
    <>
      <Box className={`top-navbar-container ${className}`}>
        <SearchBar
          searchValue={searchValue}
          className={`search-bar ${isFocusOnSearchBar ? 'active' : ''}`}
          onBlur={() => setIsFocusOnSearchBar(false)}
          onFocus={() => setIsFocusOnSearchBar(true)}
        />
        {getButtons()}
      </Box>

      <DishCardAddDialog
        open={isDishAddDialogVisible}
        onClose={() => setIsDishAddDialogVisible(false)}
      />
    </>
  );
};

export default TopNavbar;
