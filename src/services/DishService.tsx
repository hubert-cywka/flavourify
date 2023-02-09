import { Dish } from '../components/dishes/dish-card/DishCard';
import { apiClient } from './ApiClient';

export const getDishes = async (): Promise<Dish[]> => {
  const { data } = await apiClient.get<Dish[]>('/dishes');
  return data.slice();
};
