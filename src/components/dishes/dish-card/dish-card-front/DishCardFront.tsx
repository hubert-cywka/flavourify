import { Box, Button, Card, Divider, Typography } from '@mui/material';
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
        <Divider className="field-label">Name</Divider>
        <Typography className="dish-name">{dish.name}</Typography>
        <Divider className="field-label">Ingredients</Divider>
        <IngredientsList
          className="ingredients-list"
          ingredients={dish.ingredients}
          amountLimit={5}
        />
      </Box>
      <Button onClick={flipCallback} variant="contained" className="flip-card-button">
        Show recipe
      </Button>
    </Card>
  );
};

export default DishCardFront;
