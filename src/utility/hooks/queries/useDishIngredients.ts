import { useQuery } from '@tanstack/react-query';
import { MENU_INGREDIENTS_QUERY } from 'constants/QueryConstants';
import { getDishesIngredients } from 'services/DishService';
import { MenuItem } from 'services/MenuService';

export const useMenuIngredients = (menu: MenuItem[]) => {
  return useQuery([MENU_INGREDIENTS_QUERY], () =>
    getDishesIngredients(menu.map((dish) => dish.id))
  );
};
