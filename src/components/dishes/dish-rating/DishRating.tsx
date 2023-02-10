import { Box, Rating, Typography } from '@mui/material';
import './DishRating.scss';

type RatingType = 'global' | 'personal';

interface DishRatingProps {
  type: RatingType;
  className?: string;
}

const DishRating = ({ type, className }: DishRatingProps) => {
  const buildRatingType = () => {
    if (type === 'personal') {
      return (
        <Box className="dish-rating-container">
          <Typography variant="caption">Your rating:</Typography>
          <Rating className={`dish-rating ${className}`} precision={0.1}></Rating>
        </Box>
      );
    } else {
      return (
        <Box className="dish-rating-container">
          <Typography variant="caption">{`Other's rating:`}</Typography>
          <Rating
            className={`dish-rating ${className}`}
            precision={0.1}
            value={4.45}
            readOnly></Rating>
        </Box>
      );
    }
  };

  return buildRatingType();
};

export default DishRating;
