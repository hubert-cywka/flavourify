import IngredientTile from '../ingredient-tile/IngredientTile';
import { Box } from '@mui/material';
import './IngredientList.scss';
import { Ingredient } from '../../../interfaces/Ingredient';

interface IngredientsListProps {
  ingredients: Ingredient[];
  amountLimit: number;
  className?: string;
}

const IngredientsList = ({ ingredients, amountLimit, className }: IngredientsListProps) => {
  const parseIngredientsList = (ingredients: Ingredient[], amount: number): Ingredient[] => {
    if (amount <= 0) return ingredients;
    return ingredients.slice(0, amount);
  };

  const getNumberOfItemsOverLimit = (): number => {
    return ingredients.length - amountLimit;
  };

  return (
    <Box className={`ingredient-list-container ${className}`}>
      {parseIngredientsList(ingredients, amountLimit).map((ingredient, id) => {
        return <IngredientTile key={id} className="ingredient-tile" ingredient={ingredient} />;
      })}
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
