import { apiClient } from './ApiClient';
import { ALL_TAGS } from 'constants/TagsConstants';
import { Dish } from 'types/interfaces/Dish';
import { Ingredient } from 'types/interfaces/Ingredient';

export interface DishesPage {
  dishes: Dish[];
  hasNext: boolean;
  hasPrevious: boolean;
  currentPage: number;
  totalPages: number;
}

export interface DishNameAndId {
  name: string;
  id: number;
}

export const getDishesPage = async (id: number, page: number): Promise<DishesPage> => {
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

export const getListOfDishesByName = async (name: string): Promise<DishNameAndId[]> => {
  const { data } = await apiClient.get<DishNameAndId[]>(`/dishes/names?name=${name}`);
  return data;
};

export const getDish = async (dishId: number): Promise<Dish> => {
  const { data } = await apiClient.get<Dish>(`/dishes/${dishId}`);
  return data;
};

export const getLatestDish = async (): Promise<Dish> => {
  const { data } = await apiClient.get<Dish>(`/dishes/latest`);
  return data;
};

export const getRandomDishes = async (amount: number): Promise<Dish[]> => {
  const { data } = await apiClient.get<Dish[]>(`/dishes/random?amount=${amount}`);
  return data;
};

export const getDishesIngredients = async (ids: number[]): Promise<Ingredient[]> => {
  const { data } = await apiClient.get<Dish[]>(`/dishes/ingredients?ids=${ids}`);
  return data;
};
