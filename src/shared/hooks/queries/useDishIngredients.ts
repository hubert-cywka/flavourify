import { useQuery } from '@tanstack/react-query';
import { getDishesIngredients } from 'services/DishService';
import { MenuItem } from 'services/MenuService';
import { MENU_INGREDIENTS_QUERY } from 'shared/constants/QueryConstants';

export const useMenuIngredients = (menu: MenuItem[]) => {
  return useQuery([MENU_INGREDIENTS_QUERY], () =>
    getDishesIngredients(menu.map((dish) => dish.id))
  );
};
