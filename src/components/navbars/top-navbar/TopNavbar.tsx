import { Box } from '@mui/material';
import './TopNavbar.scss';
import DisplayedTag from '../../tags/displayed-tag/DisplayedTag';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded } from '@mui/icons-material';
import { useState } from 'react';
import appRouter from '../../router/AppRouter';
import { motion } from 'framer-motion';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DishCardAddDialog from '../../dishes/dish-card/other-variants/dish-card-add/DishCardAddDialog';

interface TopNavbarProps {
  className?: string;
  singleDishVariant?: boolean;
  searchValue?: string;
}

const TopNavbar = ({ className, singleDishVariant, searchValue }: TopNavbarProps) => {
  const [isFocusOnSearchBar, setIsFocusOnSearchBar] = useState(false);
  const [isDishAddDialogVisible, setIsDishAddDialogVisible] = useState(false);

  const getButtons = () => {
    return (
      <motion.div
        className="top-navbar-buttons"
        animate={{ width: isFocusOnSearchBar ? 0 : 'fit-content' }}>
        {!singleDishVariant ? (
          <>
            <DisplayedTag className="displayed-tag" />
            <AddRoundedIcon
              sx={{ color: 'secondary.main' }}
              className="add-dish-button"
              onClick={() => setIsDishAddDialogVisible(true)}
            />
          </>
        ) : (
          <ArrowBackRounded
            className="back-button"
            sx={{ color: 'secondary.main' }}
            onClick={() => appRouter.navigate(-1)}
          />
        )}
      </motion.div>
    );
  };

  return (
    <>
      <Box className={`top-navbar-container ${className}`}>
        <SearchBar
          searchValue={searchValue}
          className="search-bar"
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
