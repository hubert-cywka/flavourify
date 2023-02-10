import IngredientTile from '../ingredient-tile/IngredientTile';
import { Box, Divider, Typography } from '@mui/material';
import './IngredientList.scss';
import { Ingredient } from '../../../interfaces/Ingredient';
import { useState } from 'react';
import MultiplierInput from './multiplier-input/MultiplierInput';

interface IngredientsListProps {
  ingredients: Ingredient[];
  amountLimit: number;
  className?: string;
  withMultiplier?: boolean;
}

const IngredientsList = ({
  ingredients,
  amountLimit,
  className,
  withMultiplier
}: IngredientsListProps) => {
  const [multiplier, setMultiplier] = useState<number>(1);

  const reduceIngredientList = (ingredientsList: Ingredient[], amount: number): Ingredient[] => {
    if (amount <= 0) return ingredientsList;
    return ingredientsList.slice(0, amount);
  };

  const getNumberOfItemsOverLimit = (): number => {
    return ingredients.length - amountLimit;
  };

  const multiplyAmount = (ingredientsList: Ingredient[], multiplier: number) => {
    if (Number.isNaN(multiplier)) return ingredientsList;
    let multipliedIngredients: Ingredient[] = structuredClone(ingredientsList);
    for (const ingredient of multipliedIngredients) {
      if (ingredient.quantity) ingredient.quantity.amount *= multiplier;
    }
    return multipliedIngredients;
  };

  return (
    <Box className={`ingredient-list-container ${className}`}>
      {withMultiplier && (
        <>
          <Box className="servings-container">
            <Typography className="servings-text">Servings: </Typography>
            <MultiplierInput
              className="multiplier-input"
              callback={setMultiplier}
              value={multiplier}
              min={1}
              max={10}
            />
          </Box>
          <Divider className="ingredients-divider" />
        </>
      )}
      {multiplyAmount(reduceIngredientList(ingredients, amountLimit), multiplier).map(
        (ingredient, id) => {
          return <IngredientTile key={id} className="ingredient-tile" ingredient={ingredient} />;
        }
      )}
      {amountLimit > 0 && amountLimit < ingredients.length && (
        <IngredientTile
          className="ingredient-tile"
          ingredient={{ name: `And ${getNumberOfItemsOverLimit()} more` }}
        />
      )}
    </Box>
  );
};

export default IngredientsList;
