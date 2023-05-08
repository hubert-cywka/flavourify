import { useQuery } from '@tanstack/react-query';
import { DISH_QUERY, DISHES_QUERY } from '../../constants/QueryConstants';
import { getDish } from '../../services/DishService';

export const useDish = (id: number) => {
  return useQuery([DISHES_QUERY, DISH_QUERY, { id: id }], () => getDish(id));
};
