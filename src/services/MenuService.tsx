import { Dish } from '../interfaces/Dish';
import { Ingredient } from '../interfaces/Ingredient';

export interface MenuItem {
  id: number;
  date: Date;
  name: string;
  ingredients: Ingredient[];
}

export const MENU_STORAGE_KEY = 'MENU_STORAGE_KEY';

const getMenuFromLocalStorage = (): MenuItem[] => {
  const menu = localStorage.getItem(MENU_STORAGE_KEY);
  if (!menu) return [];
  return JSON.parse(menu);
};

const saveMenuToLocalStorage = (menu: MenuItem[]) => {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
};

const isFromPast = (dateToCheck: Date): boolean => {
  const date = new Date(Date.now());
  date.setHours(0, 0, 0, 0);
  return date.getTime() > new Date(dateToCheck).getTime();
};

const updateDates = () => {
  const menu = getMenuFromLocalStorage();
  const trimmedMenu = menu.filter((item) => !isFromPast(item.date));
  const newMenu = trimmedMenu.map((item: MenuItem, id: number) => {
    return {
      name: item.name,
      id: item.id,
      date: new Date(Date.now() + 3600 * 1000 * 24 * id),
      ingredients: item.ingredients
    };
  });
  saveMenuToLocalStorage(newMenu);
};

export const getMenu = (): MenuItem[] => {
  updateDates();
  return getMenuFromLocalStorage();
};

export const updateMenu = (menu: MenuItem[]) => {
  saveMenuToLocalStorage(menu);
};

export const addToMenu = (dish: Dish) => {
  const menu = getMenuFromLocalStorage();
  menu.push({
    id: dish.id,
    name: dish.name,
    date: new Date(Date.now()),
    ingredients: dish.ingredients
  });
  saveMenuToLocalStorage(menu);
};

export const removeFromMenu = (indexToRemove: number) => {
  const menu = getMenuFromLocalStorage();
  menu.splice(indexToRemove, 1);
  saveMenuToLocalStorage(menu);
};
