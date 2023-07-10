import { DISH_NAME_MAX_LENGTH, INGREDIENT_NAME_MAX_LENGTH, MAX_MENU_SIZE } from './NumberConstants';

export const DEFAULT_RECIPE_STEP = '';
export const INGREDIENT_DEFAULT_UNIT = 'pcs';
export const NEW_INGREDIENT_PLACEHOLDER = 'Edit me!';
export const DISH_NAME_PLACEHOLDER = 'Your dish name';
export const DISH_IMAGE_PLACEHOLDER = '/no-recipes.svg';
export const DISH_TAGS_DEFAULT = [];

export const NAME_EDIT_ERROR = `Name of dish can have only ${DISH_NAME_MAX_LENGTH} characters.`;
export const INGREDIENT_EDIT_ERROR = `Ingredient name can not be longer than ${INGREDIENT_NAME_MAX_LENGTH} characters.`;
export const IMAGE_EDIT_ERROR =
  'You have to upload file in .png or .jpeg format. It will be scaled down if necessary.';
export const INGREDIENT_EDIT_IMAGE = '/ingredient-edit.svg';

export const IMAGE_EDIT_INFO = 'Upload picture of your dish in .png or .jpg format.';
export const INGREDIENT_EDIT_INFO = `Select name of ingredient (maximum ${INGREDIENT_NAME_MAX_LENGTH} characters). You can also toggle ingredient quantity, set new quantity amount and unit or remove ingredient completely.`;

export const DISH_SEARCH_DONE = 'Swipe once again to see more recipes.';
export const NO_RECIPES_IMAGE = '/no-recipes.svg';
export const NO_RECIPES_TITLE = 'Could not find any recipes!';
export const NO_RECIPES_BUTTON = 'Reload recipes';

export const LAST_RECIPE_IMAGE = '/last-recipe.svg';
export const LAST_RECIPE_TITLE = 'It was last recipe!';
export const LAST_RECIPE_BUTTON = 'Return to beginning';

export const DISH_UPDATE_SUCCESS = 'Dish saved successfully.';
export const DISH_UPDATE_ERROR = 'Failed to save dish recipe. Please try again later.';
export const IMAGE_COMPRESSION_ERROR = 'Failed to compress image. Updating dish without new image.';

export const DISH_DELETE_SUCCESS = 'Dish recipe deleted successfully.';
export const DISH_DELETE_ERROR = 'Failed to delete dish recipe. Please try again later.';

export const DISH_EMPTY_NAME_ERROR = 'You have to enter dish name.';
export const DISH_EMPTY_INGREDIENTS_ERROR = 'You have to add at least 1 ingredient.';
export const DISH_EMPTY_RECIPE_ERROR = 'You have to add at least 1 recipe step.';
export const DISH_WRONG_TAGS_COUNT_ERROR = 'Please add valid amount of tags.';
export const DISH_NOT_CHANGED_NAME_ERROR =
  'Please, find any original name. Placeholder value is not allowed.';

export const DISH_ADD_TO_MENU_ERROR = `You already have menu for whole next ${MAX_MENU_SIZE} days!`;
export const DISH_ADD_TO_MENU_SUCCESS = ' added to menu!';

export const DISH_UPDATE_SUCCESS_IMAGE = '/dish-update-success.svg';
export const DISH_UPDATE_ERROR_IMAGE = '/dish-update-error.svg';

export const EMPTY_MENU_IMAGE = '/pizza-share.svg';
export const EMPTY_MENU_ERROR = 'Menu is empty.';
export const EMPTY_MENU_INFO = 'Find wonderful recipes and add them to your weekly menu!';

export const MENU_INGREDIENTS_HEADER = `Let's see what you need!`;
export const MENU_INGREDIENTS_INFO = (
  <>
    Looking forward to a dinner, but still have not bought groceries?
    <b> We got you!</b> Calculate how many ingredients you need. Remember, that every dish recipe
    contains ingredients for only <b>1 serving</b>.
  </>
);
export const MENU_INGREDIENTS_IMAGE = '/menu-ingredients.svg';
export const MENU_PLAN_INFO = `Interested in new recipes? Add them to your menu by clicking bookmark button or swipe right on front side of dish card. Hold and drag to reorganize your menu, click 'delete button' if you are not interested anymore or 'search button' to check detailed recipe.`;
export const MENU_PLAN_HEADER = 'Menu for upcoming days';

export const NO_INGREDIENTS_ERROR = 'Failed to find needed ingredients. Sorry.';
