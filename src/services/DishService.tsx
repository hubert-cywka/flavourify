import { apiClient } from './ApiClient';
import { Dish } from '../interfaces/Dish';

export const getDishes = async (): Promise<Dish[]> => {
  const { data } = await apiClient.get<Dish[]>('/dishes');
  return data.slice();
};

export const updateDish = async (updatedDish: Dish): Promise<Dish> => {
  const { data } = await apiClient.put<Dish>(`/dishes/${updatedDish.id}`, updatedDish);
  return data;
};

export const deleteDish = async (dishId: number) => {
  const { data } = await apiClient.delete(`/dishes/${dishId}`);
  return data;
};
