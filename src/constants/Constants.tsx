import { Tag, TagType } from '../interfaces/Tag';

export const DISH_NAME_MAX_LENGTH = 35;
export const INGREDIENT_NAME_MAX_LENGTH = 20;
export const INGREDIENT_COUNT_MAX_LENGTH = 5;
export const INGREDIENT_UNIT_MAX_LENGTH = 8;

export const MIN_INGREDIENTS_MULTIPLIER = 1;
export const MAX_INGREDIENTS_MULTIPLIER = 10;

export const MIN_TAGS_NUMBER = 1;
export const MAX_TAGS_NUMBER = 4;

export const TAG_NAME_MIN_LENGTH = 3;
export const TAG_NAME_MAX_LENGTH = 20;

export const TAG_DELETE_INFO =
  'Select one tag from list by clicking on it and click button to delete it. All dishes with this tag will have it removed.';
export const TAG_DELETE_WARNING = 'This change is irreversible.';
export const TAG_ADD_INFO =
  'Create new tag for your dishes, propose its name and select one of few available categories, that suits it most.';
export const TAG_ADD_REQUIREMENTS = `Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_UPDATE_INFO =
  'Select one tag from list by clicking on it and update its name or delete it. All dishes with this tag will be updated accordingly.';

export const TAG_TYPES: TagType[] = ['Cuisine', 'Course', 'Diet', 'Other'];

export const TAG_ADD_ERROR_LENGTH = `Failed to add tag. Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_ADD_ERROR = 'Failed to add tag. Please try again later';
export const TAG_ADD_SUCCESS = 'Tag added successfully';

export const TAG_DELETE_ERROR = 'Failed to delete tag. Please try again later';
export const TAG_DELETE_SUCCESS = 'Tag deleted successfully';

export const TAG_UPDATE_ERROR_LENGTH = `Failed to update tag. Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_UPDATE_ERROR = 'Failed to update tag. Please try again later';
export const TAG_UPDATE_SUCCESS = 'Tag updated successfully';

export const NEW_INGREDIENT_PLACEHOLDER = 'New ingredient';
export const DISH_NAME_PLACEHOLDER = 'Your dish name';
export const DISH_IMAGE_PLACEHOLDER = './no-recipes.svg';
export const DISH_TAGS_DEFAULT = [];

export const TAGS_SELECTED_INFO = `Please select ${MIN_TAGS_NUMBER} - ${MAX_TAGS_NUMBER} tags that describes this dish best.`;
export const TAGS_SELECTED_ERROR = `You have to select ${MIN_TAGS_NUMBER} - ${MAX_TAGS_NUMBER} tags.`;
export const NAME_EDIT_ERROR = `Name of dish can have only ${DISH_NAME_MAX_LENGTH} characters`;
export const INGREDIENT_EDIT_ERROR = `Ingredient name can only be ${INGREDIENT_NAME_MAX_LENGTH} characters long`;
export const IMAGE_EDIT_ERROR =
  'You have to upload file in .png or .jpeg format. It will be scaled down if necessary.';

export const IMAGE_EDIT_INFO = 'Upload picture of your dish in .png or .jpg format.';

export const NO_RECIPES_IMAGE = './no-recipes.svg';
export const NO_RECIPES_TITLE = 'Could not find any recipes!';
export const NO_RECIPES_BUTTON = 'Reload recipes';

export const ALL_TAGS: Tag = { name: 'All', id: -1, type: 'Other' };

export const NO_TAGS_IMAGE = './no-tags.svg';
export const NO_TAGS_ERROR = 'No tags are currently available. Sorry.';

export const LAST_RECIPE_IMAGE = './last-recipe.svg';
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
