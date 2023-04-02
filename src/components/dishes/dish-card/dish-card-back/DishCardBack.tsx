import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import './DishCardBack.scss';
import { Dish } from '../../../../types/interfaces/Dish';
import IngredientsList, {
  getUpdatedIngredients
} from '../../../ingredients/ingredients-list/IngredientsList';
import DishRecipe, { getUpdatedRecipe } from '../../dish-recipe/DishRecipe';
import EditIconRounded from '@mui/icons-material/EditRounded';
import {
  ArrowBackRounded,
  CancelRounded,
  CheckCircleRounded,
  DeleteRounded
} from '@mui/icons-material';
import { useRef, useState } from 'react';
import EditableTextField from '../../../custom-inputs/editable-text-field/EditableTextField';
import { addDish, deleteDish, updateDish } from '../../../../services/DishService';
import { queryClient } from '../../../../services/QueryClient';
import DishImage from '../../dish-image/DishImage';
import { getCompressedImageUrl } from '../../../../utility/getCompressedImageUrl';
import { DISHES_QUERY } from '../../../../constants/QueryConstants';
import { DISH_NAME_MAX_LENGTH } from '../../../../constants/NumberConstants';
import { DishCardProps } from '../DishCard';
import { useSnackbar } from 'notistack';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { validateDishFields } from '../../../../utility/validateDishFields';
import { getCompleteTagsFromTagNames } from '../../../../utility/getCompleteTagsFromTagNames';
import { getTags } from '../../../../services/TagsService';
import {
  DISH_ADD_SUCCESS,
  DISH_DELETE_ERROR,
  DISH_DELETE_SUCCESS,
  DISH_UPDATE_ERROR,
  DISH_UPDATE_ERROR_IMAGE,
  DISH_UPDATE_SUCCESS,
  DISH_UPDATE_SUCCESS_IMAGE,
  IMAGE_COMPRESSION_ERROR,
  NAME_EDIT_ERROR
} from '../../../../constants/DishesConstants';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import TagsList from '../../../tags/tags-list/TagsList';
import StatusScreen from '../../../status-screen/StatusScreen';
import { hasAdminPermission } from '../../../../services/AuthService';

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
  const [status, setStatus] = useState<'success' | 'error' | 'idle'>('idle');
  const [readOnly, setReadOnly] = useState<boolean>(!addMode);

  const nameRef = useRef<HTMLInputElement>(null);
  const recipeRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const enterEditMode = () => {
    setReadOnly(false);
  };

  const cancelEdit = () => {
    setDisplayedDish(structuredClone(dish));
    setReadOnly(true);
  };

  const updateName = () => {
    return nameRef?.current?.firstChild
      ? (nameRef.current.firstChild as HTMLInputElement).value
      : displayedDish.name;
  };
  const updateTags = async () => {
    if (!tagsRef?.current?.children) return displayedDish.tags;

    const newTags: string[] = [];
    const newTagsArray = Array.from(tagsRef.current.children);
    for (let i = 0; i < newTagsArray.length - 1; i++) {
      newTags.push((newTagsArray[i] as HTMLDivElement).innerHTML);
    }

    const tagsList = await getTags(false);
    return getCompleteTagsFromTagNames(newTags, tagsList);
  };

  const updateDishImage = async (): Promise<string> => {
    if (!imageRef?.current) return displayedDish.img;
    try {
      return await getCompressedImageUrl(imageRef.current.src);
    } catch {
      enqueueSnackbar(IMAGE_COMPRESSION_ERROR);
      return displayedDish.img;
    }
  };

  const createUpdatedDishRecipe = async (): Promise<Dish> => {
    return {
      ...displayedDish,
      name: updateName(),
      recipe: getUpdatedRecipe(recipeRef, displayedDish.recipe),
      ingredients: getUpdatedIngredients(ingredientsRef, displayedDish.ingredients),
      tags: await updateTags(),
      img: await updateDishImage()
    };
  };

  const getRequestMethod = (dishToSend: Dish) => {
    return addMode ? addDish(dishToSend) : updateDish(dishToSend);
  };

  const approveEdit = async () => {
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
        queryClient.invalidateQueries({ queryKey: [DISHES_QUERY] }).finally(() => {
          setReadOnly(true);
          setIsLoading(false);
          setStatus('success');
          setDisplayedDish(res);
        });
      })
      .catch(() => {
        setIsLoading(false);
        setStatus('error');
      });
  };

  const handleFlipCallback = () => {
    cancelEdit();
    if (flipCallback) flipCallback();
  };

  const removeDish = () => {
    if (dish.id === undefined) return;
    setIsLoading(true);
    deleteDish(dish.id)
      .then(async () => {
        queryClient.invalidateQueries({ queryKey: [DISHES_QUERY] }).finally(() => {
          setIsDeleteDialogOpen(false);
          setIsLoading(false);
          handleFlipCallback();
          enqueueSnackbar(DISH_DELETE_SUCCESS, { variant: 'success' });
        });
      })
      .catch(() => {
        enqueueSnackbar(DISH_DELETE_ERROR);
        setIsLoading(false);
      });
  };

  const getEditingPanel = () => {
    if (isLoading) {
      return <CircularProgress sx={{ color: 'accent.main' }} className="action-button" />;
    } else if (readOnly) {
      return (
        <>
          <IconButton
            sx={{ color: 'accent.main' }}
            className="action-button"
            onClick={enterEditMode}>
            <EditIconRounded />
          </IconButton>
          <IconButton
            sx={{ color: 'accent.main' }}
            className="action-button"
            onClick={() => setIsDeleteDialogOpen(true)}>
            <DeleteRounded />
          </IconButton>
        </>
      );
    } else {
      return (
        <>
          <IconButton sx={{ color: 'accent.main' }} className="action-button" onClick={cancelEdit}>
            <CancelRounded />
          </IconButton>
          <IconButton
            disabled={isLoading}
            sx={{ color: 'accent.main' }}
            className="action-button"
            onClick={approveEdit}>
            <CheckCircleRounded />
          </IconButton>
        </>
      );
    }
  };

  const getStatusScreen = () => {
    return (
      <>
        <StatusScreen
          header={'Success!'}
          open={status === 'success'}
          caption={addMode ? DISH_ADD_SUCCESS : DISH_UPDATE_SUCCESS}
          imgSource={DISH_UPDATE_SUCCESS_IMAGE}
          status={'success'}
          close={() => {
            setStatus('idle');
            if (onQuerySuccess) onQuerySuccess();
          }}
        />
        <StatusScreen
          header={'Oops!'}
          open={status === 'error'}
          caption={DISH_UPDATE_ERROR}
          imgSource={DISH_UPDATE_ERROR_IMAGE}
          secondButtonText={'Retry'}
          status={'error'}
          close={() => setStatus('idle')}
          secondButtonOnClick={() => {
            setStatus('idle');
            approveEdit();
          }}
        />
      </>
    );
  };

  return (
    <>
      <Box className={`dish-card-back-container ${className}`}>
        {!addMode && hasAdminPermission() && <Box className="edit-panel">{getEditingPanel()}</Box>}
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
          <Box className="dish-card-content-container">
            <Divider className="field-label">Name</Divider>
            <EditableTextField
              className="dish-name"
              isReadOnly={readOnly}
              value={displayedDish.name}
              reference={nameRef}
              max={DISH_NAME_MAX_LENGTH}
              errorMessage={NAME_EDIT_ERROR}
              sx={{ color: 'text.primary' }}
            />
            <Divider className="field-label">Available in</Divider>
            <TagsList tags={dish.tags} editable={!readOnly} reference={tagsRef} />
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
        </Box>
        {addMode ? (
          <Button
            onClick={approveEdit}
            variant="successContained"
            className="flip-card-button"
            disabled={isLoading}
            endIcon={<PlaylistAddCheckRoundedIcon />}>
            Submit recipe
          </Button>
        ) : (
          <Button
            onClick={handleFlipCallback}
            variant="secondaryContained"
            className="flip-card-button"
            startIcon={<ArrowBackRounded />}>
            Go back
          </Button>
        )}
      </Box>

      {getStatusScreen()}

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
                variant="errorContained"
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
