import { useQuery } from '@tanstack/react-query';
import { getRandomDishes } from 'services/DishService';
import { DISHES_QUERY, RANDOM_DISHES_QUERY } from 'shared/constants/QueryConstants';

export const useRandomDish = () => {
  return useQuery([DISHES_QUERY, RANDOM_DISHES_QUERY], () => getRandomDishes(1), {
    refetchOnWindowFocus: false
  });
};
