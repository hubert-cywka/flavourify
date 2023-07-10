import { createContext } from 'react';
import { Tag } from 'shared/types/Dish';

export interface lastViewedDishI {
  tag: Tag;
  slide: number;
}

export const lastViewedDishContext = createContext(
  {} as { setLastViewedDish: (value: lastViewedDishI) => void; lastViewedDish: lastViewedDishI } // eslint-disable-line no-unused-vars
);
