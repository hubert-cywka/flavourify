import {
  DISH_EMPTY_INGREDIENTS_ERROR,
  DISH_EMPTY_NAME_ERROR,
  DISH_EMPTY_RECIPE_ERROR,
  DISH_NAME_PLACEHOLDER,
  DISH_NOT_CHANGED_NAME_ERROR,
  DISH_WRONG_TAGS_COUNT_ERROR
} from 'constants/DishesConstants';
import { MAX_TAGS_NUMBER, MIN_TAGS_NUMBER } from 'constants/NumberConstants';
import { Dish } from 'types/interfaces/Dish';

export const validateDishFields = (validatedDish: Dish): string => {
  if (!validatedDish.name.length) {
    return DISH_EMPTY_NAME_ERROR;
  } else if (validatedDish.name === DISH_NAME_PLACEHOLDER) {
    return DISH_NOT_CHANGED_NAME_ERROR;
  }

  if (!validatedDish.recipe.length) {
    return DISH_EMPTY_RECIPE_ERROR;
  }

  if (!validatedDish.ingredients.length) {
    return DISH_EMPTY_INGREDIENTS_ERROR;
  }

  if (validatedDish.tags.length < MIN_TAGS_NUMBER || validatedDish.tags.length > MAX_TAGS_NUMBER) {
    return DISH_WRONG_TAGS_COUNT_ERROR;
  }

  return '';
};
