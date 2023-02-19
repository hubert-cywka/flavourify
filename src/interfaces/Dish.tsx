import { Ingredient } from './Ingredient';
import { Tag } from './Tag';

export interface Dish {
  id?: number;
  name: string;
  img: string;
  ingredients: Ingredient[];
  recipe: string[];
  tags: Tag[];
}
