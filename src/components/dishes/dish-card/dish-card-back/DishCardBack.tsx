import { Box, Button, CircularProgress, Divider, IconButton } from '@mui/material';
import './DishCardBack.scss';
import { useSnackbar } from 'notistack';
import {
  DISH_DELETE_ERROR,
  DISH_DELETE_SUCCESS,
  DISH_NAME_PLACEHOLDER,
  DISH_UPDATE_ERROR,
  DISH_UPDATE_ERROR_IMAGE,
  DISH_UPDATE_SUCCESS,
  DISH_UPDATE_SUCCESS_IMAGE,
  NAME_EDIT_ERROR
} from 'shared/constants/DishesConstants';
import { DISH_NAME_MAX_LENGTH } from 'shared/constants/NumberConstants';
import { DISHES_QUERY } from 'shared/constants/QueryConstants';
import { hasAdminPermission } from 'services/AuthService';
import { addDish, deleteDish, updateDish } from 'services/DishService';
import { queryClient } from 'services/QueryClient';
import { Dish } from 'shared/types/Dish';
import { createUpdatedDishRecipe } from 'shared/utility/dishRecipeUpdateUtils';
import { validateDishFields } from 'shared/utility/validateDishFields';
import EditableTextField from 'components/primitives/editable-text-field/EditableTextField';
import IngredientsList from 'components/ingredients/ingredients-list/IngredientsList';
import DishRecipe from 'components/dishes/dish-recipe/DishRecipe';
import {
  EditRounded,
  ArrowBackRounded,
  CancelRounded,
  CheckCircleRounded,
  DeleteRounded,
  PlaylistAddCheckRounded
} from '@mui/icons-material';
import { useRef, useState } from 'react';
import DishImage from 'components/dishes/dish-image/DishImage';
import { DishCardProps } from 'components/dishes/dish-card/DishCard';
import TagsList from 'components/tags/tags-list/TagsList';
import StatusScreen from 'components/status-screen/StatusScreen';
import classNames from 'classnames';
import DishDeleteDialog from './dish-delete-dialog/DishDeleteDialog';

interface DishCardBackProps extends DishCardProps {
  addMode?: boolean;
  onMutationSuccess?: () => void;
}

const DishCardBack = ({
  dish,
  className,
  callback,
  addMode,
  onMutationSuccess
}: DishCardBackProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [displayedDish, setDisplayedDish] = useState<Dish>(structuredClone(dish));
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | 'idle'>('idle');
  const [readOnly, setReadOnly] = useState(!addMode);

  const isStatusSuccess = status === 'success';

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

  const getRequestMethod = (dishToSend: Dish) => {
    return addMode ? addDish(dishToSend) : updateDish(dishToSend);
  };

  const approveEdit = async () => {
    setIsLoading(true);
    const updatedDish = await createUpdatedDishRecipe(
      nameRef,
      recipeRef,
      ingredientsRef,
      tagsRef,
      imageRef,
      displayedDish
    );

    const validationFailedReason = validateDishFields(updatedDish);
    if (validationFailedReason) {
      enqueueSnackbar(validationFailedReason);
      return setIsLoading(false);
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
    if (callback) callback();
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

  const buildEditingPanel = () => {
    if (isLoading) {
      return (
        <CircularProgress
          sx={{ color: 'accent.main', padding: '10px 0px' }}
          className="action-button"
        />
      );
    } else if (readOnly) {
      return (
        <>
          <IconButton
            sx={{ color: 'accent.success' }}
            className="action-button"
            onClick={enterEditMode}>
            <EditRounded />
          </IconButton>
          <IconButton
            sx={{ color: 'accent.error' }}
            className="action-button"
            onClick={() => setIsDeleteDialogOpen(true)}>
            <DeleteRounded />
          </IconButton>
        </>
      );
    } else {
      return (
        <>
          <IconButton sx={{ color: 'accent.error' }} className="action-button" onClick={cancelEdit}>
            <CancelRounded />
          </IconButton>
          <IconButton
            disabled={isLoading}
            sx={{ color: 'accent.success' }}
            className="action-button"
            onClick={approveEdit}>
            <CheckCircleRounded />
          </IconButton>
        </>
      );
    }
  };

  const retryQuery = () => {
    setStatus('idle');
    approveEdit();
  };

  const closeStatusMessage = () => {
    setStatus('idle');
    if (status === 'success' && onMutationSuccess) onMutationSuccess();
  };

  const getButtonText = () => {
    if (!addMode) {
      return 'Go back';
    } else {
      return isLoading ? 'Submitting...' : 'Submit recipe';
    }
  };

  return (
    <>
      <Box className={classNames('dish-card-back-container', className)}>
        {!addMode && hasAdminPermission() && (
          <Box className="edit-panel">{buildEditingPanel()}</Box>
        )}
        <Box className="scrollable-dish-details">
          <Box className="image-container">
            <DishImage
              src={dish.img}
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
              preventScroll
              placeholder={DISH_NAME_PLACEHOLDER}
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
        <Button
          variant="successContained"
          className="flip-card-button"
          onClick={addMode ? approveEdit : handleFlipCallback}
          disabled={addMode ? isLoading : false}
          endIcon={addMode ? <PlaylistAddCheckRounded /> : <ArrowBackRounded />}>
          {getButtonText()}
        </Button>
      </Box>

      {status !== 'idle' && (
        <StatusScreen
          header={isStatusSuccess ? 'Success!' : 'Oops!'}
          open={true}
          caption={isStatusSuccess ? DISH_UPDATE_SUCCESS : DISH_UPDATE_ERROR}
          imgSource={isStatusSuccess ? DISH_UPDATE_SUCCESS_IMAGE : DISH_UPDATE_ERROR_IMAGE}
          secondButtonText={isStatusSuccess ? undefined : 'Retry'}
          status={status}
          close={closeStatusMessage}
          secondButtonOnClick={isStatusSuccess ? undefined : retryQuery}
        />
      )}

      <DishDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        deleteCallback={removeDish}
      />
    </>
  );
};

export default DishCardBack;
