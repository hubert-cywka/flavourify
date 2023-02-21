import { Dish } from '../interfaces/Dish';

export function pushUnique(to: Dish[], from: Dish[]) {
  const dishesCopy = to.slice();
  from.forEach((dish) => {
    if (!dishesCopy.find((d) => d.id === dish.id)) dishesCopy.push(dish);
  });
  return dishesCopy;
}
