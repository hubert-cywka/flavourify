import { Box, Button, Collapse, Dialog, Grow, Typography } from '@mui/material';
import {
  INGREDIENT_DEFAULT_UNIT,
  INGREDIENT_EDIT_ERROR,
  INGREDIENT_EDIT_IMAGE,
  INGREDIENT_EDIT_INFO,
  NEW_INGREDIENT_PLACEHOLDER
} from 'shared/constants/DishesConstants';
import EditableTextField from 'components/primitives/editable-text-field/EditableTextField';
import {
  INGREDIENT_COUNT_MAX_LENGTH,
  INGREDIENT_DEFAULT_AMOUNT,
  INGREDIENT_NAME_MAX_LENGTH,
  INGREDIENT_UNIT_MAX_LENGTH
} from 'shared/constants/NumberConstants';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { memo, useRef } from 'react';
import { Ingredient } from 'shared/types/Dish';
import './IngredientEditDialog.scss';

interface IngredientEditDialogProps {
  onClose: () => void;
  onDelete?: () => void;
  isOpen: boolean;
  ingredient: Ingredient;
  updateCallback: (ingredient: Ingredient) => void; // eslint-disable-line no-unused-vars
}

const IngredientEditDialog = ({
  onClose,
  onDelete,
  isOpen,
  ingredient,
  updateCallback
}: IngredientEditDialogProps) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (onDelete) onDelete();
    onClose();
  };

  const toggleQuantity = () => {
    if (ingredient.quantity) {
      updateCallback({ name: ingredient.name });
      (nameRef?.current?.firstChild as HTMLInputElement)?.focus();
    } else {
      updateCallback({
        ...ingredient,
        quantity: { amount: INGREDIENT_DEFAULT_AMOUNT, unit: INGREDIENT_DEFAULT_UNIT }
      });
      (amountRef?.current?.firstChild as HTMLInputElement)?.focus();
    }
    return !ingredient.quantity;
  };

  const updateIngredient = () => {
    const hasQuantity =
      ingredient.quantity && amountRef?.current?.firstChild && unitRef?.current?.firstChild;

    const newName = nameRef?.current?.firstChild
      ? (nameRef.current.firstChild as HTMLInputElement).value
      : ingredient.name;

    if (hasQuantity) {
      const newAmount = parseFloat((amountRef.current.firstChild as HTMLInputElement).value);
      const newUnit = (unitRef.current.firstChild as HTMLInputElement).value;
      updateCallback({ name: newName, quantity: { amount: newAmount, unit: newUnit } });
    } else {
      updateCallback({ name: newName });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        className="ingredients-edit-form"
        sx={{ bgcolor: 'secondary.dark', color: 'text.primary' }}>
        <Box className="ingredients-edit-form-content">
          <Grow in={true}>
            <Box>
              <img src={INGREDIENT_EDIT_IMAGE} className="ingredients-edit-info-image" />
            </Box>
          </Grow>
          <Typography className="ingredients-edit-info-header">Editing ingredients</Typography>
          <Typography className="ingredients-edit-info-description">
            {INGREDIENT_EDIT_INFO}
          </Typography>

          <Box className="ingredients-edit-form-row">
            <Typography className="field-name-label">Name:</Typography>
            <EditableTextField
              sx={{ color: 'text.primary' }}
              className="editable-text-field"
              value={ingredient.name === NEW_INGREDIENT_PLACEHOLDER ? '' : ingredient.name}
              placeholder={NEW_INGREDIENT_PLACEHOLDER}
              reference={nameRef}
              max={INGREDIENT_NAME_MAX_LENGTH}
              errorMessage={INGREDIENT_EDIT_ERROR}
            />
          </Box>

          <Collapse in={!!ingredient.quantity} className="ingredient-quantity-rows">
            <>
              <Box className="ingredients-edit-form-row">
                <Typography className="field-name-label">Amount:</Typography>
                <EditableTextField
                  sx={{ color: 'text.primary' }}
                  autoFocus={ingredient.quantity?.amount === INGREDIENT_DEFAULT_AMOUNT}
                  className="editable-text-field"
                  value={ingredient.quantity?.amount.toString() ?? ''}
                  reference={amountRef}
                  max={INGREDIENT_COUNT_MAX_LENGTH}
                  type="number"
                />
              </Box>
              <Box className="ingredients-edit-form-row">
                <Typography className="field-name-label">Unit:</Typography>
                <EditableTextField
                  sx={{ color: 'text.primary' }}
                  className="editable-text-field"
                  value={ingredient.quantity?.unit ?? ''}
                  reference={unitRef}
                  max={INGREDIENT_UNIT_MAX_LENGTH}
                />
              </Box>
            </>
          </Collapse>
        </Box>

        <Box className="ingredients-edit-buttons">
          <Button
            variant="errorOutlined"
            onClick={handleDelete}
            className="action-button"
            startIcon={<HighlightOffRoundedIcon />}>
            Delete
          </Button>
          <Button
            variant="accentOutlined"
            onClick={toggleQuantity}
            className="action-button"
            startIcon={<MonitorWeightRoundedIcon />}>
            Quantity
          </Button>
          <Button
            variant="successOutlined"
            onClick={updateIngredient}
            className="action-button"
            startIcon={<CheckCircleOutlineRoundedIcon />}>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default memo(IngredientEditDialog);
