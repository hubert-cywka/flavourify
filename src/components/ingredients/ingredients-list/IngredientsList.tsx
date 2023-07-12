import IngredientTile from 'components/ingredients/ingredient-tile/IngredientTile';
import { Box, IconButton, Typography } from '@mui/material';
import './IngredientList.scss';
import { ComponentProps, memo, RefObject, useCallback, useState } from 'react';
import { AddCircleRounded } from '@mui/icons-material';
import { simpleOpacityAnimation } from 'shared/constants/AnimationConfigs';
import { NEW_INGREDIENT_PLACEHOLDER } from 'shared/constants/DishesConstants';
import {
  MAX_INGREDIENTS_MULTIPLIER,
  MIN_INGREDIENTS_MULTIPLIER
} from 'shared/constants/NumberConstants';
import { Ingredient } from 'shared/types/Dish';
import { getUpdatedIngredients } from 'shared/utility/dishRecipeUpdateUtils';
import { useUpdateEffect } from 'shared/hooks/useUpdateEffect';
import AnimatePresence from 'components/animate-presence/AnimatePresence';
import MultiplierInput from 'components/primitives/multiplier-input/MultiplierInput';
import classNames from 'classnames';

interface IngredientsListProps extends ComponentProps<'div'> {
  ingredients: Ingredient[];
  amountLimit: number;
  withMultiplier?: boolean;
  editable?: boolean;
  reference?: RefObject<any>;
}

const IngredientsList = ({
  ingredients,
  amountLimit,
  className,
  withMultiplier,
  editable,
  reference
}: IngredientsListProps) => {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [displayedIngredients, setDisplayedIngredients] = useState<Ingredient[]>(ingredients);

  useUpdateEffect(() => {
    setDisplayedIngredients(ingredients);
  }, [ingredients]);

  const getReducedIngredientsList = (): Ingredient[] => {
    if (amountLimit <= 0) return displayedIngredients;
    return displayedIngredients.slice(0, amountLimit);
  };

  const getNumberOfItemsOverLimit = (): number => {
    return displayedIngredients.length - amountLimit;
  };

  const addNewIngredient = () => {
    if (!reference) return;
    const updatedIngredients = getUpdatedIngredients(reference, displayedIngredients);
    updatedIngredients.push({ name: NEW_INGREDIENT_PLACEHOLDER });
    setDisplayedIngredients(updatedIngredients.slice());
  };

  const deleteIngredient = useCallback(
    (id: number) => {
      if (!reference) return;
      const updatedIngredients = getUpdatedIngredients(reference, displayedIngredients);
      updatedIngredients.splice(id, 1);
      setDisplayedIngredients(updatedIngredients.slice());
    },
    [reference, displayedIngredients]
  );

  return (
    <Box className={`ingredient-list-container ${className}`} ref={reference}>
      {withMultiplier && !editable && (
        <Box className="servings-container">
          <Typography className="servings-text">Servings: </Typography>
          <MultiplierInput
            className="multiplier-input"
            onChange={setMultiplier}
            value={multiplier}
            min={MIN_INGREDIENTS_MULTIPLIER}
            max={MAX_INGREDIENTS_MULTIPLIER}
          />
        </Box>
      )}

      {getReducedIngredientsList().map((ingredient, id) => {
        return (
          <AnimatePresence
            key={id}
            isVisible={true}
            animation={simpleOpacityAnimation}
            className="ingredient-tile-container">
            <IngredientTile
              className={classNames('ingredient-tile', editable, {
                new: ingredient.name === NEW_INGREDIENT_PLACEHOLDER
              })}
              isEditDialogOpen={ingredient.name === NEW_INGREDIENT_PLACEHOLDER}
              editable={editable}
              ingredient={ingredient}
              multiplier={editable ? 1 : multiplier}
              onDelete={() => deleteIngredient(id)}
            />
          </AnimatePresence>
        );
      })}

      {amountLimit > 0 && amountLimit < displayedIngredients.length && (
        <Box className="ingredient-tile-container">
          <IngredientTile
            className="ingredient-tile"
            ingredient={{ name: `And ${getNumberOfItemsOverLimit()} more` }}
          />
        </Box>
      )}

      {editable && (
        <IconButton onClick={addNewIngredient} className="add-ingredient-button">
          <AddCircleRounded sx={{ color: 'text.primary' }} />
        </IconButton>
      )}
    </Box>
  );
};

export default memo(IngredientsList);
