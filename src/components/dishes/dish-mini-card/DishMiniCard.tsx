import { Dish } from '../../../interfaces/Dish';
import { CardMedia, Box } from '@mui/material';
import './DishMiniCard.scss';
import DishTags from '../dish-tags/DishTags';

interface DishMiniCardProps {
  dish: Dish;
  className?: string;
  onClick?: () => void;
}

const DishMiniCard = ({ dish, className, onClick }: DishMiniCardProps) => {
  return (
    <Box key={dish.id} onClick={onClick} className={`dish-mini-card-container ${className}`}>
      <Box className="dish-image-container">
        <CardMedia className="dish-image" component="img" src={dish.img} />
      </Box>
      <Box className="content-container">
        <Box className="dish-name">{dish.name}</Box>
        <Box className="dish-tags-container">
          <DishTags className="dish-tags" tags={dish.tags} />
        </Box>
      </Box>
    </Box>
  );
};

export default DishMiniCard;
