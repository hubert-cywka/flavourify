import { DISH_NAME_MAX_LENGTH, INGREDIENT_NAME_MAX_LENGTH } from './NumberConstants';

export const NEW_INGREDIENT_PLACEHOLDER = 'New ingredient';
export const DISH_NAME_PLACEHOLDER = 'Your dish name';
export const DISH_IMAGE_PLACEHOLDER = '/no-recipes.svg';
export const DISH_TAGS_DEFAULT = [];

export const NAME_EDIT_ERROR = `Name of dish can have only ${DISH_NAME_MAX_LENGTH} characters`;
export const INGREDIENT_EDIT_ERROR = `Ingredient name can only be ${INGREDIENT_NAME_MAX_LENGTH} characters long`;
export const IMAGE_EDIT_ERROR =
  'You have to upload file in .png or .jpeg format. It will be scaled down if necessary.';
export const INGREDIENT_EDIT_IMAGE = '/ingredient-edit.svg';

export const IMAGE_EDIT_INFO = 'Upload picture of your dish in .png or .jpg format.';
export const INGREDIENT_EDIT_INFO = `Select name of ingredient (maximum ${INGREDIENT_NAME_MAX_LENGTH} characters). You can also toggle ingredient quantity, set new quantity amount and unit or remove ingredient completely.`;

export const DISH_SEARCH_DONE_IMAGE = '/all-done.svg';
export const DISH_SEARCH_DONE_TITLE = 'Got everything you needed?';
export const DISH_SEARCH_DONE_BUTTON = 'Go back to previous page';

export const NO_RECIPES_IMAGE = '/no-recipes.svg';
export const NO_RECIPES_TITLE = 'Could not find any recipes!';
export const NO_RECIPES_BUTTON = 'Reload recipes';

export const LAST_RECIPE_IMAGE = '/last-recipe.svg';
export const LAST_RECIPE_TITLE = 'It was last recipe!';
export const LAST_RECIPE_BUTTON = 'Return to beginning';

export const DISH_UPDATE_SUCCESS = 'Dish updated successfully.';
export const DISH_UPDATE_ERROR = 'Failed to update dish recipe. Please try again later.';
export const IMAGE_COMPRESSION_ERROR = 'Failed to compress image. Updating dish without new image.';

export const DISH_DELETE_SUCCESS = 'Dish recipe deleted successfully';
export const DISH_DELETE_ERROR = 'Failed to delete dish recipe. Please try again later.';

export const DISH_ADD_SUCCESS = 'Dish added successfully.';
export const DISH_EMPTY_NAME_ERROR = 'You have to enter dish name.';
export const DISH_EMPTY_INGREDIENTS_ERROR = 'You have to add at least 1 ingredient.';
export const DISH_EMPTY_RECIPE_ERROR = 'You have to add at least 1 recipe step.';
export const DISH_WRONG_TAGS_COUNT_ERROR = 'Please add valid amount of tags.';
export const DISH_NOT_CHANGED_NAME_ERROR =
  'Please, find any original name. Placeholder value is not allowed.';

export const DISH_ADD_TO_MENU_ERROR = 'You have already menu for whole next week!';
export const DISH_ADD_TO_MENU_SUCCESS = 'Dish added to menu!';
