import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import './DishCardFront.scss';
import DishRating from '../../dish-rating/DishRating';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import { Dish } from '../../../../interfaces/Dish';

interface DishCardProps {
  dish: Dish;
  flipCallback: () => void;
  className?: string;
}

const DishCardFront = ({ dish, className, flipCallback }: DishCardProps) => {
  return (
    <Card className={`dish-card-front-container ${className}`}>
      <CardMedia
        className="dish-image"
        component="img"
        alt={dish.name}
        image={dish.img}></CardMedia>
      <Typography className="dish-name">{dish.name}</Typography>
      <Box className="ratings-container">
        <DishRating className="dish-rating" type={'personal'} />
        <DishRating className="dish-rating" type={'global'} />
      </Box>
      <IngredientsList
        className="ingredients-list"
        ingredients={dish.ingredients}
        amountLimit={5}
      />
      <Button
        onClick={flipCallback}
        sx={{
          textTransform: 'none'
        }}
        variant="contained"
        className="flip-card-button">
        Show recipe
      </Button>
    </Card>
  );
};

export default DishCardFront;
