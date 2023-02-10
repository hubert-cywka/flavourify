import { Card, CardMedia, Typography } from '@mui/material';
import './DishCard.scss';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { Dish } from '../../../interfaces/Dish';

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
      <IngredientsList
        className="ingredients-list"
        ingredients={dish.ingredients}
        amountLimit={5}
      />
    </Card>
  );
};

export default DishCard;
