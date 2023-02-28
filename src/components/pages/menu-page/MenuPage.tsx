import { Box, Typography } from '@mui/material';
import './MenuPage.scss';
import MenuList from './menu-list/MenuList';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { useQuery } from '@tanstack/react-query';
import { MENU_INGREDIENTS_QUERY } from '../../../constants/QueryConstants';
import { getDishesIngredients } from '../../../services/DishService';
import { getMenu } from '../../../services/MenuService';

const MenuPage = () => {
  const { data } = useQuery([MENU_INGREDIENTS_QUERY], () =>
    getDishesIngredients(getMenu().map((dish) => dish.id))
  );

  return (
    <Box
      className="menu-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <Box className="menu-plan-container">
        <MenuList className="menu-plan" />
        <Box className="summed-ingredients-container">
          <Typography className="ingredients-header" sx={{ color: 'text.primary' }}>
            Needed ingredients:
          </Typography>
          {data && (
            <IngredientsList
              className="summed-menu-ingredients"
              ingredients={data}
              amountLimit={0}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuPage;
