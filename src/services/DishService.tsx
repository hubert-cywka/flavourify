import { apiClient } from './ApiClient';
import { Dish } from '../interfaces/Dish';

export const getDishes = async (): Promise<Dish[]> => {
  const { data } = await apiClient.get<Dish[]>('/dishes');
  return data.slice();
};
