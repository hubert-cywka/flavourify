import { Dialog, Typography, Box, Button } from '@mui/material';
import './IngredientTile.scss';
import { type Ingredient } from '../../../interfaces/Ingredient';
import { useState, useRef, useCallback } from 'react';
import EditableTextField from '../../custom-inputs/editable-text-field/EditableTextField';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import {
  INGREDIENT_COUNT_MAX_LENGTH,
  INGREDIENT_NAME_MAX_LENGTH,
  INGREDIENT_UNIT_MAX_LENGTH
} from '../../../constants/NumberConstants';
import {
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
}

const IngredientTile = ({
  ingredient,
  className,
  editable,
  multiplier,
  deleteCallback
}: IngredientTileProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [displayedIngredient, setDisplayedIngredient] = useState(ingredient);
  const [hasQuantity, setHasQuantity] = useState<boolean>(!!displayedIngredient.quantity);
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
    setHasQuantity((prevState) => {
      if (!prevState) {
        setDisplayedIngredient({ ...displayedIngredient, quantity: { amount: 0, unit: 'pcs' } });
      } else {
        setDisplayedIngredient({ name: displayedIngredient.name });
      }
      return !prevState;
    });
  };

  const updateIngredient = () => {
    const newName = nameRef?.current?.firstChild
      ? (nameRef.current.firstChild as HTMLInputElement).value
      : displayedIngredient.name;

    if (hasQuantity && amountRef?.current?.firstChild && unitRef?.current?.firstChild) {
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
          className="ingredients-edit-dialog"
          sx={{ bgcolor: 'background.default', color: 'text.secondary' }}>
          <AnimatePresence>
            <motion.div
              key={INGREDIENT_EDIT_IMAGE_MOTION}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'fit-content' }}
              exit={{ opacity: 0, height: 0 }}>
              <img src={INGREDIENT_EDIT_IMAGE} className="ingredients-edit-info-image" />
            </motion.div>
          </AnimatePresence>
          <Typography className="ingredients-edit-info-header">Editing ingredients</Typography>
          <Typography className="ingredients-edit-info-description">
            {INGREDIENT_EDIT_INFO}
          </Typography>
          <Box className="ingredients-edit-form">
            <Box className="ingredients-edit-form-row">
              <Typography className="field-name-label">Name:</Typography>
              <EditableTextField
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
                  key={INGREDIENT_QUANTITY_ROWS_MOTION}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'fit-content' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <Box className="ingredients-edit-form-row">
                    <Typography className="field-name-label">Amount:</Typography>
                    <EditableTextField
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
                      className="editable-text-field"
                      value={displayedIngredient.quantity.unit}
                      reference={unitRef}
                      max={INGREDIENT_UNIT_MAX_LENGTH}
                    />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
            <Box className="ingredients-edit-form-row">
              <Button
                variant="errorContained"
                onClick={handleDelete}
                className="action-button"
                startIcon={<HighlightOffRoundedIcon />}>
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={toggleQuantity}
                className="action-button"
                startIcon={<MonitorWeightRoundedIcon />}>
                Quantity
              </Button>
              <Button
                variant="successContained"
                onClick={updateIngredient}
                className="action-button"
                startIcon={<CheckCircleOutlineRoundedIcon />}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default IngredientTile;
