import { Dish } from '../../../interfaces/Dish';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import './DishDetails.scss';
import DishRecipe from '../dish-recipe/DishRecipe';

interface DishDetailsProps {
  dish: Dish;
  flipCallback: () => void;
  className?: string;
}

const DishDetails = ({ dish, className, flipCallback }: DishDetailsProps) => {
  return (
    <Card className={`dish-details-container ${className}`}>
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
        />
        <DishRecipe recipe={dish.recipe} className="dish-recipe" />
      </Box>
      <Button
        onClick={flipCallback}
        sx={{
          textTransform: 'none'
        }}
        variant="contained"
        className="hide-details-button">
        Go back
      </Button>
    </Card>
  );
};

export default DishDetails;
