import { Box } from '@mui/material';
import './IngredientTile.scss';
import { NEW_INGREDIENT_PLACEHOLDER } from 'shared/constants/DishesConstants';
import { type Ingredient } from 'shared/types/Dish';
import { useState, ComponentProps, memo, useCallback } from 'react';
import { useUpdateEffect } from 'shared/hooks/useUpdateEffect';
import classNames from 'classnames';
import IngredientEditDialog from '../ingredient-edit-dialog/IngredientEditDialog';

interface IngredientTileProps extends ComponentProps<'div'> {
  ingredient: Ingredient;
  editable?: boolean;
  multiplier?: number;
  onDelete?: () => void;
  isEditDialogOpen?: boolean;
}

const IngredientTile = ({
  ingredient,
  className,
  editable,
  multiplier,
  onDelete,
  isEditDialogOpen
}: IngredientTileProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(!!isEditDialogOpen);
  const [displayedIngredient, setDisplayedIngredient] = useState(ingredient);

  useUpdateEffect(() => {
    setDisplayedIngredient(ingredient);
  }, [ingredient]);

  const openEditDialog = useCallback(() => {
    if (editable) {
      setIsDialogOpen(true);
    }
  }, [editable]);

  const closeEditDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const getMultipliedAmount = () => {
    if (!displayedIngredient.quantity) return;
    return multiplier
      ? displayedIngredient.quantity.amount * multiplier
      : displayedIngredient.quantity.amount;
  };

  return (
    <>
      <Box
        className={classNames('ingredient-tile-container', className, { editable: editable })}
        onClick={openEditDialog}>
        <Box className="ingredient-name">
          {displayedIngredient.name ? displayedIngredient.name : NEW_INGREDIENT_PLACEHOLDER}
        </Box>
        {displayedIngredient.quantity && (
          <>
            <Box className="ingredient-amount">{getMultipliedAmount()}</Box>
            <Box className="ingredient-unit">{displayedIngredient.quantity.unit}</Box>
          </>
        )}
      </Box>

      <IngredientEditDialog
        onClose={closeEditDialog}
        onDelete={onDelete}
        isOpen={isDialogOpen}
        ingredient={displayedIngredient}
        updateCallback={setDisplayedIngredient}
      />
    </>
  );
};

export default memo(IngredientTile);
