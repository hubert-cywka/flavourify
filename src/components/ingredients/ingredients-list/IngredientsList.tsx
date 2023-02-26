import IngredientTile from '../ingredient-tile/IngredientTile';
import { Box, IconButton, Typography } from '@mui/material';
import './IngredientList.scss';
import { Ingredient } from '../../../interfaces/Ingredient';
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

  const addNewIngredient = useCallback(() => {
    displayedIngredients.push({ name: NEW_INGREDIENT_PLACEHOLDER });
    setDisplayedIngredients(displayedIngredients.slice());
  }, [displayedIngredients]);

  const deleteIngredient = useCallback(
    (id: number) => {
      displayedIngredients.splice(id, 1);
      setDisplayedIngredients(displayedIngredients.slice());
    },
    [displayedIngredients]
  );

  const parsedIngredientsList = useMemo(
    (): ReactJSXElement[] =>
      getReducedIngredientsList().map((ingredient, id) => {
        return (
          <IngredientTile
            key={id}
            className="ingredient-tile"
            editable={editable}
            ingredient={ingredient}
            multiplier={editable ? 1 : multiplier}
            deleteCallback={() => deleteIngredient(id)}
          />
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
        <IngredientTile
          className="ingredient-tile"
          ingredient={{ name: `And ${getNumberOfItemsOverLimit()} more` }}
        />
      )}

      {editable && (
        <IconButton onClick={addNewIngredient}>
          <AddCircleRounded sx={{ color: 'text.primary' }} />
        </IconButton>
      )}
    </Box>
  );
};

export default IngredientsList;
