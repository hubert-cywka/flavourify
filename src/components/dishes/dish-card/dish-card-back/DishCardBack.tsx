import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import './DishCardBack.scss';
import { Dish } from '../../../../interfaces/Dish';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishRecipe from '../../dish-recipe/DishRecipe';

interface DishDetailsProps {
  dish: Dish;
  flipCallback: () => void;
  className?: string;
}

const DishCardBack = ({ dish, className, flipCallback }: DishDetailsProps) => {
  return (
    <Card className={`dish-card-back-container ${className}`}>
      <Box className="scrollable-dish-details">
        <CardMedia
          className="dish-image"
          component="img"
          alt={dish.name}
          image={dish.img}></CardMedia>
        <Typography className="dish-name">{dish.name}</Typography>
        <IngredientsList
          className="ingredients-list"
          ingredients={dish.ingredients}
          amountLimit={0}
          withMultiplier={true}
        />
        <DishRecipe recipe={dish.recipe} className="dish-recipe" />
      </Box>
      <Button
        onClick={flipCallback}
        sx={{
          textTransform: 'none'
        }}
        variant="contained"
        className="flip-card-button">
        Go back
      </Button>
    </Card>
  );
};

export default DishCardBack;
