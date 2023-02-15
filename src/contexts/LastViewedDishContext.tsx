import { createContext } from 'react';

export interface LastViewedDish {
  categoryId: number;
  dishId: number;
}

export const LastViewedDishContext = createContext(
  {} as { setLastViewedDish: (value: LastViewedDish) => void; lastViewedDish: LastViewedDish } // eslint-disable-line no-unused-vars
);
