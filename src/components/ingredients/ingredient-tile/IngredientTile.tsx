import { Dialog, Typography, Box, Button } from '@mui/material';
import './IngredientTile.scss';
import { type Ingredient } from '../../../types/interfaces/Ingredient';
import { useState, useRef, useCallback } from 'react';
import EditableTextField from '../../custom-inputs/editable-text-field/EditableTextField';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import {
  INGREDIENT_COUNT_MAX_LENGTH,
  INGREDIENT_DEFAULT_AMOUNT,
  INGREDIENT_NAME_MAX_LENGTH,
  INGREDIENT_UNIT_MAX_LENGTH
} from '../../../constants/NumberConstants';
import {
  INGREDIENT_DEFAULT_UNIT,
  INGREDIENT_EDIT_ERROR,
  INGREDIENT_EDIT_IMAGE,
  INGREDIENT_EDIT_INFO
} from '../../../constants/DishesConstants';
import { AnimatePresence, motion } from 'framer-motion';
import {
  INGREDIENT_EDIT_IMAGE_MOTION,
  INGREDIENT_QUANTITY_ROWS_MOTION
} from '../../../constants/MotionKeyConstants';

interface IngredientTileProps {
  ingredient: Ingredient;
  className?: string;
  editable?: boolean;
  multiplier?: number;
  deleteCallback?: () => void;
  opened?: boolean;
}

const IngredientTile = ({
  ingredient,
  className,
  editable,
  multiplier,
  deleteCallback,
  opened
}: IngredientTileProps) => {
  const [open, setOpen] = useState<boolean>(!!opened);
  const [displayedIngredient, setDisplayedIngredient] = useState(ingredient);
  const nameRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    setDisplayedIngredient(ingredient);
  }, [ingredient]);

  const openEditDialog = useCallback(() => {
    if (editable) setOpen(true);
  }, [editable]);

  const closeEditDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (deleteCallback) deleteCallback();
    closeEditDialog();
  }, [deleteCallback]);

  const toggleQuantity = () => {
    if (!displayedIngredient.quantity) {
      setDisplayedIngredient({
        ...displayedIngredient,
        quantity: { amount: INGREDIENT_DEFAULT_AMOUNT, unit: INGREDIENT_DEFAULT_UNIT }
      });
      (amountRef?.current?.firstChild as HTMLInputElement)?.focus();
    } else {
      setDisplayedIngredient({ name: displayedIngredient.name });
      (nameRef?.current?.firstChild as HTMLInputElement)?.focus();
    }
    return !displayedIngredient.quantity;
  };

  const updateIngredient = () => {
    const newName = nameRef?.current?.firstChild
      ? (nameRef.current.firstChild as HTMLInputElement).value
      : displayedIngredient.name;

    if (
      displayedIngredient.quantity &&
      amountRef?.current?.firstChild &&
      unitRef?.current?.firstChild
    ) {
      const newAmount = parseFloat((amountRef.current.firstChild as HTMLInputElement).value);
      const newUnit = (unitRef.current.firstChild as HTMLInputElement).value;
      setDisplayedIngredient({ name: newName, quantity: { amount: newAmount, unit: newUnit } });
    } else {
      setDisplayedIngredient({ name: newName });
    }
    closeEditDialog();
  };

  return (
    <>
      <Box className={`ingredient-tile-container ${className}`} onClick={openEditDialog}>
        <Box className="ingredient-name">{displayedIngredient.name}</Box>
        {displayedIngredient.quantity && (
          <>
            <Box className="ingredient-amount">
              {multiplier
                ? displayedIngredient.quantity.amount * multiplier
                : displayedIngredient.quantity.amount}
            </Box>
            <Box className="ingredient-unit">{displayedIngredient.quantity.unit}</Box>
          </>
        )}
      </Box>

      <Dialog open={open} onClose={closeEditDialog}>
        <Box
          className="ingredients-edit-form"
          sx={{ bgcolor: 'secondary.dark', color: 'text.primary' }}>
          <Box className="ingredients-edit-form-content">
            <AnimatePresence>
              <motion.div
                key={INGREDIENT_EDIT_IMAGE_MOTION}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '80%' }}
                exit={{ opacity: 0, width: 0 }}>
                <img src={INGREDIENT_EDIT_IMAGE} className="ingredients-edit-info-image" />
              </motion.div>
            </AnimatePresence>
            <Typography className="ingredients-edit-info-header">Editing ingredients</Typography>
            <Typography className="ingredients-edit-info-description">
              {INGREDIENT_EDIT_INFO}
            </Typography>
            <Box className="ingredients-edit-form-row">
              <Typography className="field-name-label">Name:</Typography>
              <EditableTextField
                sx={{ color: 'text.primary' }}
                className="editable-text-field"
                value={displayedIngredient.name}
                reference={nameRef}
                max={INGREDIENT_NAME_MAX_LENGTH}
                errorMessage={INGREDIENT_EDIT_ERROR}
              />
            </Box>
            <AnimatePresence>
              {!!displayedIngredient.quantity && (
                <motion.div
                  className="ingredient-quantity-rows"
                  key={INGREDIENT_QUANTITY_ROWS_MOTION}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'fit-content' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <Box className="ingredients-edit-form-row">
                    <Typography className="field-name-label">Amount:</Typography>
                    <EditableTextField
                      sx={{ color: 'text.primary' }}
                      autoFocus={displayedIngredient.quantity.amount === INGREDIENT_DEFAULT_AMOUNT}
                      className="editable-text-field"
                      value={displayedIngredient.quantity.amount.toString()}
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
                      value={displayedIngredient.quantity.unit}
                      reference={unitRef}
                      max={INGREDIENT_UNIT_MAX_LENGTH}
                    />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
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
    </>
  );
};

export default IngredientTile;
