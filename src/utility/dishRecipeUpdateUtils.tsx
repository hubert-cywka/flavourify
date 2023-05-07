import { RefObject } from 'react';
import { Tag } from '../types/interfaces/Tag';
import { getTags } from '../services/TagsService';
import { getCompleteTagsFromTagNames } from './getCompleteTagsFromTagNames';
import { getCompressedImageUrl } from './getCompressedImageUrl';
import { enqueueSnackbar } from 'notistack';
import { IMAGE_COMPRESSION_ERROR, NEW_INGREDIENT_PLACEHOLDER } from '../constants/DishesConstants';
import { Ingredient } from '../types/interfaces/Ingredient';
import { Dish } from '../types/interfaces/Dish';

export const getUpdatedTags = async (ref: RefObject<any>, placeholder: Tag[]) => {
  if (!ref?.current?.children) return placeholder;

  const newTags: string[] = [];
  const newTagsArray = Array.from(ref.current.children);
  for (let i = 0; i < newTagsArray.length - 1; i++) {
    newTags.push((newTagsArray[i] as HTMLDivElement).innerHTML);
  }

  const tagsList = await getTags(false);
  return getCompleteTagsFromTagNames(newTags, tagsList);
};

export const getUpdatedDishImage = async (
  ref: RefObject<any>,
  placeholder: string
): Promise<string> => {
  if (!ref?.current) return placeholder;
  try {
    return await getCompressedImageUrl(ref.current.src, 0.8);
  } catch {
    enqueueSnackbar(IMAGE_COMPRESSION_ERROR);
    return placeholder;
  }
};

export const getUpdatedRecipe = (ref: RefObject<any>, placeholder: string[]) => {
  if (!ref?.current?.children) return placeholder;
  const newRecipe: string[] = [];
  const newRecipeArray: HTMLElement[] = Array.from(ref.current.children);
  for (let i = 0; i < newRecipeArray.length - 1; i++) {
    const step = (newRecipeArray[i].children[0].children[2].firstChild as HTMLInputElement).value;
    if (step.length) newRecipe.push(step);
  }
  return newRecipe.slice();
};

export const getUpdatedName = (ref: RefObject<any>, placeholder: string) => {
  return ref?.current?.firstChild
    ? (ref.current.firstChild as HTMLInputElement).value
    : placeholder;
};

export const getUpdatedIngredients = (ref: RefObject<any>, placeholder: Ingredient[]) => {
  if (!ref?.current?.children) return placeholder;

  const newIngredients: Ingredient[] = [];
  const ingredientTiles = Array.from(ref.current.children).slice(0, -1) as HTMLElement[];

  for (const element of ingredientTiles) {
    const newName = element.children[0].children[0].innerHTML;
    if (newName === NEW_INGREDIENT_PLACEHOLDER) continue;
    const newAmount = element.children[0].children[1]?.innerHTML;
    const newUnit = element.children[0].children[2]?.innerHTML;

    if (newAmount && newUnit) {
      newIngredients.push({
        name: newName,
        quantity: { amount: parseFloat(newAmount), unit: newUnit }
      });
    } else {
      newIngredients.push({ name: newName });
    }
  }

  return newIngredients;
};

export const createUpdatedDishRecipe = async (
  nameRef: RefObject<any>,
  recipeRef: RefObject<any>,
  ingredientsRef: RefObject<any>,
  tagsRef: RefObject<any>,
  imageRef: RefObject<any>,
  placeholder: Dish
): Promise<Dish> => {
  return {
    ...placeholder,
    name: getUpdatedName(nameRef, placeholder.name),
    recipe: getUpdatedRecipe(recipeRef, placeholder.recipe),
    ingredients: getUpdatedIngredients(ingredientsRef, placeholder.ingredients),
    tags: await getUpdatedTags(tagsRef, placeholder.tags),
    img: await getUpdatedDishImage(imageRef, placeholder.img)
  };
};
