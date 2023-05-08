import { useQuery } from '@tanstack/react-query';
import { DISHES_QUERY, LATEST_DISH_QUERY } from '../../constants/QueryConstants';
import { getLatestDish } from '../../services/DishService';

export const useLatestDish = () => {
  return useQuery([DISHES_QUERY, LATEST_DISH_QUERY], getLatestDish);
};
