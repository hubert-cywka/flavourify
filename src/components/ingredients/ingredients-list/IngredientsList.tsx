import IngredientTile from '../ingredient-tile/IngredientTile';
import { Box, IconButton, Typography } from '@mui/material';
import './IngredientList.scss';
import { Ingredient } from '../../../types/interfaces/Ingredient';
import { RefObject, useCallback, useMemo, useState } from 'react';
import MultiplierInput from '../../custom-inputs/multiplier-input/MultiplierInput';
import { AddCircleRounded } from '@mui/icons-material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import {
  MAX_INGREDIENTS_MULTIPLIER,
  MIN_INGREDIENTS_MULTIPLIER
} from '../../../constants/NumberConstants';
import { NEW_INGREDIENT_PLACEHOLDER } from '../../../constants/DishesConstants';
import { getUpdatedIngredients } from '../../../utility/dishRecipeUpdateUtils';
import Animate from '../../animate/Animate';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';

interface IngredientsListProps {
  ingredients: Ingredient[];
  amountLimit: number;
  className?: string;
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

  const getReducedIngredientsList = useCallback((): Ingredient[] => {
    if (amountLimit <= 0) return displayedIngredients;
    return displayedIngredients.slice(0, amountLimit);
  }, [displayedIngredients, amountLimit]);

  const getNumberOfItemsOverLimit = useCallback((): number => {
    return displayedIngredients.length - amountLimit;
  }, [displayedIngredients, amountLimit]);

  const addNewIngredient = () => {
    if (!reference) return;
    const updatedIngredients = getUpdatedIngredients(reference, displayedIngredients);
    updatedIngredients.push({ name: NEW_INGREDIENT_PLACEHOLDER });
    setDisplayedIngredients(updatedIngredients.slice());
  };

  const deleteIngredient = (id: number) => {
    if (!reference) return;
    const updatedIngredients = getUpdatedIngredients(reference, displayedIngredients);
    updatedIngredients.splice(id, 1);
    setDisplayedIngredients(updatedIngredients.slice());
  };

  const parsedIngredientsList = useMemo(
    (): ReactJSXElement[] =>
      getReducedIngredientsList().map((ingredient, id) => {
        return (
          <Animate
            key={id}
            isVisible={true}
            animation={simpleOpacityAnimation}
            className="ingredient-tile-container">
            <IngredientTile
              className={`ingredient-tile ${
                ingredient.name === NEW_INGREDIENT_PLACEHOLDER && 'new-ingredient-tile'
              }`}
              opened={ingredient.name === NEW_INGREDIENT_PLACEHOLDER}
              editable={editable}
              ingredient={ingredient}
              multiplier={editable ? 1 : multiplier}
              deleteCallback={() => deleteIngredient(id)}
            />
          </Animate>
        );
      }),
    [displayedIngredients, editable, multiplier]
  );

  return (
    <Box className={`ingredient-list-container ${className}`} ref={reference}>
      {withMultiplier && !editable && (
        <>
          <Box className="servings-container">
            <Typography className="servings-text">Servings: </Typography>
            <MultiplierInput
              className="multiplier-input"
              callback={setMultiplier}
              value={multiplier}
              min={MIN_INGREDIENTS_MULTIPLIER}
              max={MAX_INGREDIENTS_MULTIPLIER}
            />
          </Box>
        </>
      )}

      {parsedIngredientsList}

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

export default IngredientsList;
