import { useQuery } from '@tanstack/react-query';
import { DISHES_QUERY, RANDOM_DISHES_QUERY } from '../../constants/QueryConstants';
import { getRandomDishes } from '../../services/DishService';

export const useRandomDish = () => {
  return useQuery([DISHES_QUERY, RANDOM_DISHES_QUERY], () => getRandomDishes(1), {
    refetchOnWindowFocus: false
  });
};
