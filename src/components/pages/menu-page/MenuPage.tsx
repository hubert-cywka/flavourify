import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import './MenuPage.scss';
import MenuList from './menu-list/MenuList';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { useQuery } from '@tanstack/react-query';
import { MENU_INGREDIENTS_QUERY } from '../../../constants/QueryConstants';
import { getDishesIngredients } from '../../../services/DishService';
import { getMenu } from '../../../services/MenuService';
import { AnimatePresence, motion } from 'framer-motion';
import { MENU_PAGE_MOTION } from '../../../constants/MotionKeyConstants';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';
import { useState } from 'react';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import {
  MENU_INGREDIENTS_INFO,
  MENU_INGREDIENTS_HEADER,
  MENU_INGREDIENTS_IMAGE,
  NO_INGREDIENTS_ERROR
} from '../../../constants/DishesConstants';
import Builder from '../../../utility/Builder';

const MenuPage = () => {
  const [menu, setMenu] = useState(getMenu());
  const [areIngredientsVisible, setAreIngredientsVisible] = useState<boolean>(false);
  const { data, status, refetch } = useQuery([MENU_INGREDIENTS_QUERY], () =>
    getDishesIngredients(menu.map((dish) => dish.id))
  );

  const swapSlide = () => setAreIngredientsVisible((prev) => !prev);

  const buildIngredientsList = () => {
    return Builder.createResult(status)
      .onSuccess(
        <>{data && <IngredientsList withMultiplier ingredients={data} amountLimit={0} />}</>
      )
      .onLoading(<CircularProgress className="no-ingredients" />)
      .onError(
        <Box className="no-ingredients">
          <Box className="no-ingredients-error">{NO_INGREDIENTS_ERROR}</Box>
          <Button
            className="refetch-ingredients-button"
            variant="secondaryContained"
            onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      )
      .build();
  };

  return (
    <Box
      className="menu-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <TopNavbar className="top-navbar" />
      <AnimatePresence>
        <motion.div
          className="menu-plan-container"
          key={MENU_PAGE_MOTION}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <MenuList menu={menu} onMenuChange={setMenu} className="menu-plan" />

          {!!menu.length && (
            <IconButton className="toggle-ingredients-visibility-button" onClick={swapSlide}>
              <ExpandCircleDownRoundedIcon
                sx={{ color: 'text.primary' }}
                className={areIngredientsVisible ? 'hide' : 'expand'}
              />
            </IconButton>
          )}

          <AnimatePresence>
            {areIngredientsVisible && (
              <motion.div
                className="menu-ingredients-container"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                exit={{ height: 0 }}
                transition={{ bounce: 0, duration: 0.3 }}>
                <Box className="menu-ingredients" sx={{ bgcolor: 'primary.dark' }}>
                  <img className="menu-ingredients-image" src={MENU_INGREDIENTS_IMAGE} />
                  <Box className="menu-ingredients-header">{MENU_INGREDIENTS_HEADER}</Box>
                  <Box className="menu-ingredients-info">{MENU_INGREDIENTS_INFO}</Box>
                  {buildIngredientsList()}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default MenuPage;
