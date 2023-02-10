import { Chip } from '@mui/material';
import './IngredientTile.scss';
import { type Ingredient } from '../../../interfaces/Ingredient';

interface IngredientTileProps {
  ingredient: Ingredient;
  className?: string;
}

const IngredientTile = ({ ingredient, className }: IngredientTileProps) => {
  const constructLabel = (): string => {
    return ingredient.quantity
      ? ingredient.name + ': ' + ingredient.quantity.amount + ingredient.quantity.unit
      : ingredient.name;
  };

  return (
    <Chip className={`ingredient-tile-container ${className}`} label={constructLabel()}></Chip>
  );
};

export default IngredientTile;
