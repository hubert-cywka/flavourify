import { useQuery } from '@tanstack/react-query';
import { getLatestDish } from 'services/DishService';
import { DISHES_QUERY, LATEST_DISH_QUERY } from 'shared/constants/QueryConstants';

export const useLatestDish = () => {
  return useQuery([DISHES_QUERY, LATEST_DISH_QUERY], getLatestDish);
};
