import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import './DishCardBack.scss';
import { Dish } from '../../../../interfaces/Dish';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishRecipe from '../../dish-recipe/DishRecipe';
import EditIconRounded from '@mui/icons-material/EditRounded';
import { CancelRounded, CheckCircleRounded, DeleteRounded } from '@mui/icons-material';
import { useCallback, useMemo, useRef, useState } from 'react';
import EditableTextField from '../../../custom-inputs/editable-text-field/EditableTextField';
import { addDish, deleteDish, updateDish } from '../../../../services/DishService';
import { queryClient } from '../../../../services/QueryClient';
import { Ingredient } from '../../../../interfaces/Ingredient';
import DishImage from '../../dish-image/DishImage';
import { getCompressedImageUrl } from '../../../../utility/getCompressedImageUrl';
import { DISHES_QUERY } from '../../../../constants/QueryConstants';
import {
  DISH_ADD_SUCCESS,
  DISH_DELETE_ERROR,
  DISH_DELETE_SUCCESS,
  DISH_NAME_MAX_LENGTH,
  DISH_UPDATE_ERROR,
  DISH_UPDATE_SUCCESS,
  IMAGE_COMPRESSION_ERROR,
  NAME_EDIT_ERROR,
  NEW_INGREDIENT_PLACEHOLDER
} from '../../../../constants/Constants';
import { DishCardProps } from '../DishCard';
import { useSnackbar } from 'notistack';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import DishTags from '../../dish-tags/DishTags';
import { validateDishFields } from '../../../../utility/validateDishFields';
import { getCompleteTagsFromTagNames } from '../../../../utility/getCompleteTagsFromTagNames';

interface DishCardBackProps extends DishCardProps {
  addMode?: boolean;
  onQuerySuccess?: () => void;
}

const DishCardBack = ({
  dish,
  className,
  flipCallback,
  addMode,
  onQuerySuccess
}: DishCardBackProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [displayedDish, setDisplayedDish] = useState<Dish>(structuredClone(dish));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(!addMode);

  const nameRef = useRef<HTMLInputElement>(null);
  const recipeRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

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

  const updateTags = useCallback(() => {
    if (!tagsRef?.current?.children) return displayedDish.tags;

    const newTags: string[] = [];
    const newTagsArray = Array.from(tagsRef.current.children);
    for (let i = 0; i < newTagsArray.length - 1; i++) {
      newTags.push((newTagsArray[i] as HTMLDivElement).innerHTML);
    }

    return getCompleteTagsFromTagNames(newTags);
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
    return {
      ...displayedDish,
      name: updateName(),
      recipe: updateRecipe(),
      ingredients: updateIngredients(),
      tags: updateTags(),
      img: await updateDishImage()
    };
  }, [displayedDish]);

  const getRequestMethod = (dishToSend: Dish) => {
    return addMode ? addDish(dishToSend) : updateDish(dishToSend);
  };

  const approveEdit = useCallback(async () => {
    setIsLoading(true);
    const updatedDish = await createUpdatedDishRecipe();
    const validationFailedReason = validateDishFields(updatedDish);
    if (validationFailedReason) {
      enqueueSnackbar(validationFailedReason);
      setIsLoading(false);
      return;
    }
    getRequestMethod(updatedDish)
      .then(async (res) => {
        queryClient.invalidateQueries([DISHES_QUERY]).finally(() => {
          if (onQuerySuccess) onQuerySuccess();
          setDisplayedDish(res);
          enqueueSnackbar(addMode ? DISH_ADD_SUCCESS : DISH_UPDATE_SUCCESS, { variant: 'success' });
          setReadOnly(true);
        });
      })
      .catch(() => enqueueSnackbar(DISH_UPDATE_ERROR, { variant: 'error' }))
      .finally(() => {
        setIsLoading(false);
      });
  }, [displayedDish]);

  const handleFlipCallback = () => {
    cancelEdit();
    if (flipCallback) {
      flipCallback();
    }
  };

  const removeDish = () => {
    if (!dish.id) return;
    setIsLoading(true);
    deleteDish(dish.id)
      .then(async () => {
        queryClient.invalidateQueries([DISHES_QUERY]).finally(() => {
          setIsDeleteDialogOpen(false);
          handleFlipCallback();
          enqueueSnackbar(DISH_DELETE_SUCCESS, { variant: 'success' });
        });
      })
      .catch(() => enqueueSnackbar(DISH_DELETE_ERROR))
      .finally(() => setIsLoading(false));
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
        {!addMode && <Box className="edit-panel">{getEditingPanel}</Box>}
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
          <Divider className="field-label">Name</Divider>
          <EditableTextField
            className="dish-name"
            isReadOnly={readOnly}
            value={displayedDish.name}
            reference={nameRef}
            max={DISH_NAME_MAX_LENGTH}
            errorMessage={NAME_EDIT_ERROR}
          />
          <Divider className="field-label no-divider">Available in</Divider>
          <DishTags tags={dish.tags} editable={!readOnly} reference={tagsRef} />
          <Divider className="field-label">Ingredients</Divider>
          <IngredientsList
            className="ingredients-list"
            ingredients={displayedDish.ingredients}
            amountLimit={0}
            withMultiplier={true}
            editable={!readOnly}
            reference={ingredientsRef}
          />
          <Divider className="field-label">Recipe</Divider>
          <DishRecipe
            recipe={displayedDish.recipe}
            className="dish-recipe"
            isReadOnly={readOnly}
            reference={recipeRef}
          />
        </Box>
        {addMode ? (
          <Button onClick={approveEdit} variant="contained" className="flip-card-button">
            Submit recipe
          </Button>
        ) : (
          <Button onClick={handleFlipCallback} variant="contained" className="flip-card-button">
            Go back
          </Button>
        )}
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
