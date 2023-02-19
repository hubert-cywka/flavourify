import { createContext } from 'react';
import { Tag } from '../interfaces/Tag';

export interface LastViewedDish {
  displayedTag: Tag;
  dishSlideId: number;
}

export const LastViewedDishContext = createContext(
  {} as { setLastViewedDish: (value: LastViewedDish) => void; lastViewedDish: LastViewedDish } // eslint-disable-line no-unused-vars
);
