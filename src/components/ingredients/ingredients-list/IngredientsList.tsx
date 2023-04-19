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
import { AnimatePresence, motion } from 'framer-motion';

interface IngredientsListProps {
  ingredients: Ingredient[];
  amountLimit: number;
  className?: string;
  withMultiplier?: boolean;
  editable?: boolean;
  reference?: RefObject<any>;
}

export const getUpdatedIngredients = (ref: RefObject<any>, placeholder: Ingredient[]) => {
  if (!ref?.current?.children) return placeholder;

  const newIngredients: Ingredient[] = [];
  const ingredientTiles = Array.from(ref.current.children).slice(0, -1) as HTMLElement[];

  for (const element of ingredientTiles) {
    const newName = element.children[0].children[0].innerHTML;
    if (newName === NEW_INGREDIENT_PLACEHOLDER) continue;
    const newAmount = element.children[0].children[1]?.innerHTML;
    const newUnit = element.children[0].children[2]?.innerHTML;

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
};

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
          <motion.div
            className="ingredient-tile-container"
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <IngredientTile
              className="ingredient-tile"
              editable={editable}
              ingredient={ingredient}
              multiplier={editable ? 1 : multiplier}
              deleteCallback={() => deleteIngredient(id)}
            />
          </motion.div>
        );
      }),
    [displayedIngredients, editable, multiplier]
  );

  return (
    <Box className={`ingredient-list-container ${className}`} ref={reference}>
      <AnimatePresence initial={false}>
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
      </AnimatePresence>
    </Box>
  );
};

export default IngredientsList;
