import { CardMedia, Box } from '@mui/material';
import { Dish } from 'shared/types/Dish';
import './DishMiniCard.scss';
import TagsList from 'components/tags/tags-list/TagsList';
import { ComponentProps } from 'react';

interface DishMiniCardProps extends ComponentProps<'div'> {
  dish: Dish;
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
          <TagsList className="dish-tags" tags={dish.tags} />
        </Box>
      </Box>
    </Box>
  );
};

export default DishMiniCard;
