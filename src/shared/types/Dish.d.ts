export interface Tag {
  id: number;
  name: string;
  type: TagType;
}

export type TagType = 'Cuisine' | 'Course' | 'Diet' | 'Other';

export interface Dish {
  id: number;
  name: string;
  img: string;
  ingredients: Ingredient[];
  recipe: string[];
  tags: Tag[];
}

export interface Ingredient {
  name: string;
  quantity?: Quantity;
}

export interface Quantity {
  amount: number;
  unit: string;
}
