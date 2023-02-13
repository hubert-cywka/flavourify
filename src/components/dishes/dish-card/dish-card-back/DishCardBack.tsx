import { Box, Button, Card, CircularProgress, IconButton } from '@mui/material';
import './DishCardBack.scss';
import { Dish } from '../../../../interfaces/Dish';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishRecipe from '../../dish-recipe/DishRecipe';
import EditIconRounded from '@mui/icons-material/EditRounded';
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material';
import { useCallback, useRef, useState } from 'react';
import EditableTextField from '../../../custom-inputs/editable-text-field/EditableTextField';
import { updateDish } from '../../../../services/DishService';
import { queryClient } from '../../../../services/QueryClient';
import { Ingredient } from '../../../../interfaces/Ingredient';
import DishImage from '../../dish-image/DishImage';
import { getCompressedImageUrl } from '../../../../utility/getCompressedImageUrl';
import { DISHES_QUERY } from '../../../../constants/QueryConstants';
import {
  DISH_NAME_MAX_LENGTH,
  NAME_EDIT_ERROR,
  NEW_INGREDIENT_PLACEHOLDER
} from '../../../../constants/Constants';
import { DishCardProps } from '../DishCard';

const DishCardBack = ({ dish, className, flipCallback }: DishCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [displayedDish, setDisplayedDish] = useState<Dish>(structuredClone(dish));
  const nameRef = useRef<HTMLInputElement>(null);
  const recipeRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const enterEditMode = useCallback(() => {
    setReadOnly(false);
  }, []);

  const cancelEdit = useCallback(() => {
    setDisplayedDish(structuredClone(dish));
    setReadOnly(true);
  }, [dish]);

  const updateName = useCallback(() => {
    return nameRef?.current?.firstChild
      ? (nameRef.current.firstChild as HTMLInputElement).value
      : displayedDish.name;
  }, [displayedDish]);

  const updateRecipe = useCallback(() => {
    if (!recipeRef?.current?.children) return displayedDish.recipe;

    const newRecipe: string[] = [];
    const newRecipeArray = Array.from(recipeRef.current.children);
    for (let i = 0; i < newRecipeArray.length - 1; i++) {
      const step = (newRecipeArray[i].children[1].firstChild as HTMLInputElement).value;
      if (step.length) newRecipe.push(step);
    }

    return newRecipe;
  }, [displayedDish]);

  const updateIngredients = useCallback(() => {
    if (!ingredientsRef?.current?.children) return displayedDish.ingredients;

    const newIngredients: Ingredient[] = [];
    const newIngredientsArray = Array.from(ingredientsRef.current.children).slice(0, -1);

    for (const element of newIngredientsArray) {
      const newName = element.children[0].innerHTML;
      if (newName === NEW_INGREDIENT_PLACEHOLDER) continue;

      const newAmount = element.children[1]?.innerHTML;
      const newUnit = element.children[2]?.innerHTML;

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
  }, [displayedDish]);

  const updateDishImage = useCallback(async (): Promise<string> => {
    if (!imageRef?.current) return displayedDish.img;
    else return await getCompressedImageUrl(imageRef.current.src);
  }, [displayedDish]);

  const createUpdatedDishRecipe = useCallback(async (): Promise<Dish> => {
    const newName = updateName();
    const newRecipe = updateRecipe();
    const newIngredients = updateIngredients();
    const newImage = await updateDishImage();

    return {
      ...displayedDish,
      name: newName,
      recipe: newRecipe,
      ingredients: newIngredients,
      img: newImage
    };
  }, [displayedDish]);

  const approveEdit = useCallback(async () => {
    setIsLoading(true);
    updateDish(await createUpdatedDishRecipe())
      .then(async (res) => {
        await queryClient.invalidateQueries([DISHES_QUERY]);
        setDisplayedDish(res);
      })
      .catch(() => {})
      .finally(() => {
        setReadOnly(true);
        setIsLoading(false);
      });
  }, [displayedDish]);

  const handleFlipCallback = () => {
    cancelEdit();
    flipCallback();
  };

  return (
    <Card className={`dish-card-back-container ${className}`}>
      <Box className="edit-panel">
        {isLoading ? (
          <CircularProgress />
        ) : readOnly ? (
          <IconButton
            sx={{ color: 'primary.light' }}
            className="action-button"
            onClick={enterEditMode}>
            <EditIconRounded />
          </IconButton>
        ) : (
          <>
            <IconButton
              sx={{ color: 'primary.light' }}
              className="action-button"
              onClick={cancelEdit}>
              <CancelRounded />
            </IconButton>
            <IconButton
              sx={{ color: 'primary.light' }}
              className="action-button"
              onClick={approveEdit}>
              <CheckCircleRounded />
            </IconButton>
          </>
        )}
      </Box>

      <Box className="scrollable-dish-details">
        <Box className="image-container">
          <DishImage
            src={dish.img}
            altText={dish.name}
            className="dish-image"
            editable={!readOnly}
            reference={imageRef}
          />
        </Box>
        <EditableTextField
          className="dish-name"
          isReadOnly={readOnly}
          value={displayedDish.name}
          reference={nameRef}
          max={DISH_NAME_MAX_LENGTH}
          errorMessage={NAME_EDIT_ERROR}
        />
        <IngredientsList
          className="ingredients-list"
          ingredients={displayedDish.ingredients}
          amountLimit={0}
          withMultiplier={true}
          editable={!readOnly}
          reference={ingredientsRef}
        />
        <DishRecipe
          recipe={displayedDish.recipe}
          className="dish-recipe"
          isReadOnly={readOnly}
          reference={recipeRef}
        />
      </Box>
      <Button
        onClick={handleFlipCallback}
        sx={{
          textTransform: 'none'
        }}
        variant="contained"
        className="flip-card-button">
        Go back
      </Button>
    </Card>
  );
};

export default DishCardBack;
