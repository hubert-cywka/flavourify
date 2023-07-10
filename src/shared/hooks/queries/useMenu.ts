import { useState } from 'react';
import { getMenu } from 'services/MenuService';

export const useMenu = () => {
  const [menu, setMenu] = useState(getMenu());
  return { menu, setMenu };
};
