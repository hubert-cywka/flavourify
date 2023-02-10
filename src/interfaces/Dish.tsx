import { Ingredient } from './Ingredient';

export interface Dish {
  id: number;
  name: string;
  img: string;
  ingredients: Ingredient[];
  recipe: string;
}
