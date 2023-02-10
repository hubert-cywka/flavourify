import { Box, Typography } from '@mui/material';
import './DishRecipe.scss';

interface DishRecipeProps {
  recipe: string[];
  className?: string;
}

const DishRecipe = ({ recipe, className }: DishRecipeProps) => {
  return (
    <Box className={`dish-recipe-container ${className}`}>
      {recipe.map((step, id) => {
        return (
          <Box key={id} className="recipe-step">
            <Typography sx={{ color: 'primary.main' }} className="recipe-step-number">
              {id + 1}
            </Typography>
            <Typography className="recipe-step-text">{step}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default DishRecipe;
