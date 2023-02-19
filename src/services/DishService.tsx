import { apiClient } from './ApiClient';
import { Dish } from '../interfaces/Dish';
import { ALL_TAGS } from '../constants/Constants';

export const getDishes = async (id: number): Promise<Dish[]> => {
  const requestPath = id == ALL_TAGS.id ? '/dishes' : `/dishes?tag_id=${id}`;
  const { data } = await apiClient.get<Dish[]>(requestPath);
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

export const addDish = async (newDish: Dish): Promise<Dish> => {
  const { data } = await apiClient.post<Dish>('/dishes', newDish);
  return data;
};
