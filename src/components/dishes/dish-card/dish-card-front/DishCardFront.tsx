import { Box, Button, Card, Typography } from '@mui/material';
import './DishCardFront.scss';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishImage from '../../dish-image/DishImage';
import { DishCardProps } from '../DishCard';

const DishCardFront = ({ dish, className, flipCallback }: DishCardProps) => {
  return (
    <Card className={`dish-card-front-container ${className}`}>
      <Box className="image-container">
        <DishImage src={dish.img} altText={dish.name} className="dish-image" />
      </Box>
      <Box className="content-container">
        <Typography className="dish-name">{dish.name}</Typography>
        <IngredientsList
          className="ingredients-list"
          ingredients={dish.ingredients}
          amountLimit={5}
        />
      </Box>
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
