import { createContext } from 'react';
import { Tag } from '../interfaces/Tag';

export const selectedTagContext = createContext(
  {} as { setSelectedTag: (value: Tag) => void; selectedTag: Tag } // eslint-disable-line no-unused-vars
);
