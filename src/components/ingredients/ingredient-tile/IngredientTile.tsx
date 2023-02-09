import { Chip } from '@mui/material';
import './IngredientTile.scss';

export interface Ingredient {
  id: number;
  name: string;
  amount?: string;
}

interface IngredientTileProps {
  ingredient: Ingredient;
  className?: string;
}

const IngredientTile = ({ ingredient, className }: IngredientTileProps) => {
  const constructLabel = (): string => {
    return ingredient.amount ? ingredient.name + ': ' + ingredient.amount : ingredient.name;
  };

  return <Chip className={`ingredient-tile-container ${className}`} label={constructLabel()}></Chip>;
};

export default IngredientTile;
