import { apiClient } from './ApiClient';
import { Dish } from '../interfaces/Dish';
import { ALL_TAGS } from '../constants/TagsConstants';

export interface DishesPage {
  dishes: Dish[];
  hasNext: boolean;
  hasPrevious: boolean;
  currentPage: number;
  totalPages: number;
}

export const getDishesPage = async (id: number, page: number): Promise<DishesPage> => {
  console.log('Fetching page: ' + page);
  const { data } = await apiClient.get<DishesPage>(
    `/dishes?tagid=${id !== ALL_TAGS.id ? id : ''}&page=${page}`
  );
  return data;
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
