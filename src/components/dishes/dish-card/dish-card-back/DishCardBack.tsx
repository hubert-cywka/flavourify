import { Box, Button, Card, CircularProgress, Dialog, IconButton, Typography } from '@mui/material';
import './DishCardBack.scss';
import { Dish } from '../../../../interfaces/Dish';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishRecipe from '../../dish-recipe/DishRecipe';
import EditIconRounded from '@mui/icons-material/EditRounded';
import { CancelRounded, CheckCircleRounded, DeleteRounded } from '@mui/icons-material';
import { useCallback, useMemo, useRef, useState } from 'react';
import EditableTextField from '../../../custom-inputs/editable-text-field/EditableTextField';
import { deleteDish, updateDish } from '../../../../services/DishService';
import { queryClient } from '../../../../services/QueryClient';
import { Ingredient } from '../../../../interfaces/Ingredient';
import DishImage from '../../dish-image/DishImage';
import { getCompressedImageUrl } from '../../../../utility/getCompressedImageUrl';
import { DISHES_QUERY } from '../../../../constants/QueryConstants';
import {
  DISH_DELETE_ERROR,
  DISH_DELETE_SUCCESS,
  DISH_NAME_MAX_LENGTH,
  DISH_UPDATE_ERROR,
  IMAGE_COMPRESSION_ERROR,
  NAME_EDIT_ERROR,
  NEW_INGREDIENT_PLACEHOLDER
} from '../../../../constants/Constants';
import { DishCardProps } from '../DishCard';
import { useSnackbar } from 'notistack';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const DishCardBack = ({ dish, className, flipCallback }: DishCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [displayedDish, setDisplayedDish] = useState<Dish>(structuredClone(dish));
  const nameRef = useRef<HTMLInputElement>(null);
  const recipeRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { enqueueSnackbar } = useSnackbar();

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
    try {
      return await getCompressedImageUrl(imageRef.current.src);
    } catch {
      enqueueSnackbar(IMAGE_COMPRESSION_ERROR);
      return displayedDish.img;
    }
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
      .catch(() => enqueueSnackbar(DISH_UPDATE_ERROR))
      .finally(() => {
        setReadOnly(true);
        setIsLoading(false);
      });
  }, [displayedDish]);

  const handleFlipCallback = () => {
    cancelEdit();
    flipCallback();
  };

  const removeDish = () => {
    deleteDish(dish.id)
      .then(async () => {
        await queryClient.invalidateQueries([DISHES_QUERY]);
        setIsDeleteDialogOpen(false);
        handleFlipCallback();
        enqueueSnackbar(DISH_DELETE_SUCCESS);
      })
      .catch(() => enqueueSnackbar(DISH_DELETE_ERROR));
  };

  const getEditingPanel = useMemo(() => {
    if (isLoading) {
      return <CircularProgress className="action-button" />;
    } else if (readOnly) {
      return (
        <>
          <IconButton
            sx={{ color: 'primary.light' }}
            className="action-button"
            onClick={enterEditMode}>
            <EditIconRounded />
          </IconButton>
          <IconButton
            sx={{ color: 'primary.light' }}
            className="action-button"
            onClick={() => setIsDeleteDialogOpen(true)}>
            <DeleteRounded />
          </IconButton>
        </>
      );
    } else {
      return (
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
      );
    }
  }, [isLoading, readOnly]);

  return (
    <>
      <Card className={`dish-card-back-container ${className}`}>
        <Box className="edit-panel">{getEditingPanel}</Box>
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
        <Button onClick={handleFlipCallback} variant="contained" className="flip-card-button">
          Go back
        </Button>
      </Card>
      {isDeleteDialogOpen && (
        <Dialog className="delete-dialog-container" open={isDeleteDialogOpen}>
          <Box className="delete-dialog">
            <Box className="delete-dialog-text">
              <Typography>Do you really want to delete this dish recipe?</Typography>
              <Typography className="delete-dialog-warning">This is irreversible.</Typography>
            </Box>
            <Box>
              <Button
                className="delete-dialog-button"
                variant="contained"
                onClick={() => setIsDeleteDialogOpen(false)}
                startIcon={<HighlightOffRoundedIcon />}>
                Cancel
              </Button>
              <Button
                className="delete-dialog-button"
                variant="contained"
                onClick={removeDish}
                startIcon={<DeleteRounded />}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default DishCardBack;
