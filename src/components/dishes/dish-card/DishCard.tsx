import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import './DishCard.scss';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { Dish } from '../../../interfaces/Dish';
import DishRating from '../dish-rating/DishRating';

interface DishCardProps {
  dish: Dish;
  className?: string;
}

const DishCard = ({ dish, className }: DishCardProps) => {
  return (
    <Card className={`dish-card-container ${className}`}>
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
        sx={{
          textTransform: 'none'
        }}
        variant="contained"
        className="show-details-button">
        Show recipe
      </Button>
    </Card>
  );
};

export default DishCard;
