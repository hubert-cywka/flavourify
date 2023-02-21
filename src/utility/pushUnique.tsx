export function pushUnique<T>(to: T[], from: T[]) {
  const dishesCopy = to.slice();
  from.forEach((dish) => {
    if (!dishesCopy.includes(dish)) dishesCopy.push(dish);
  });
  return dishesCopy;
}
