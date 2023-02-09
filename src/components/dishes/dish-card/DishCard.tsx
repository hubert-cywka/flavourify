import { Box, Card, CardMedia, Divider, Typography } from '@mui/material';
import './DishCard.scss';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { Ingredient } from '../../ingredients/ingredient-tile/IngredientTile';

export interface Dish {
  id: number;
  name: string;
  img: string;
  ingredients: Ingredient[];
  recipe: string;
}

interface DishCardProps {
  dish: Dish;
  className?: string;
}

const DishCard = ({ dish, className }: DishCardProps) => {
  return <Card className={`dish-card-container ${className}`}>
    <CardMedia
      className='dish-image'
      component='img'
      alt={dish.name}
      image={dish.img}>
    </CardMedia>
    <Typography className='dish-name'>{dish.name}</Typography>
    <IngredientsList className='ingredients-list' ingredients={dish.ingredients} />
  </Card>;
};

export default DishCard;
