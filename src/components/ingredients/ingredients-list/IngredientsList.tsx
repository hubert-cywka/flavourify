import IngredientTile, { Ingredient } from '../ingredient-tile/IngredientTile';
import { Box } from '@mui/material';
import './IngredientList.scss';

interface IngredientsListProps {
  ingredients: Ingredient[];
  className?: string;
}

const IngredientsList = ({ ingredients, className }: IngredientsListProps) => {
  return (
    <Box className={`ingredient-list-container ${className}`}>
      {ingredients.map((ingredient, id) => {
        return <IngredientTile key={id} className='ingredient-tile' ingredient={ingredient} />;
      })}
    </Box>
  );
};

export default IngredientsList;
