import { Box, Typography } from '@mui/material';
import './MenuPage.scss';
import MenuList from './menu-list/MenuList';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { useQuery } from '@tanstack/react-query';
import { MENU_INGREDIENTS_QUERY } from '../../../constants/QueryConstants';
import { getDishesIngredients } from '../../../services/DishService';
import { getMenu } from '../../../services/MenuService';
import { AnimatePresence, motion } from 'framer-motion';
import { MENU_PAGE_MOTION } from '../../../constants/MotionKeyConstants';

const MenuPage = () => {
  const { data, status } = useQuery([MENU_INGREDIENTS_QUERY], () =>
    getDishesIngredients(getMenu().map((dish) => dish.id))
  );

  return (
    <Box
      className="menu-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <AnimatePresence>
        <motion.div
          className="menu-plan-container"
          key={MENU_PAGE_MOTION}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <MenuList className="menu-plan" />
          {data && status === 'success' && (
            <Box className="summed-ingredients-container">
              <Typography className="ingredients-header" sx={{ color: 'text.primary' }}>
                Needed ingredients:
              </Typography>
              <IngredientsList
                className="summed-menu-ingredients"
                ingredients={data}
                amountLimit={0}
              />
            </Box>
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default MenuPage;
