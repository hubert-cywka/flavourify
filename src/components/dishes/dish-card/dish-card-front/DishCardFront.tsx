import { Box, Button, Divider } from '@mui/material';
import './DishCardFront.scss';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishImage from '../../dish-image/DishImage';
import { DishCardProps } from '../DishCard';
import { ArrowForwardRounded } from '@mui/icons-material';

import TagsList from '../../../tags/tags-list/TagsList';

const DishCardFront = ({ dish, className, callback }: DishCardProps) => {
  return (
    <Box className={`dish-card-front-container ${className}`}>
      <Box className="image-container">
        <DishImage src={dish.img} altText={dish.name} className="dish-image" />
      </Box>
      <Box className="dish-card-content-container">
        <Divider className="field-label">Name</Divider>
        <Box className="dish-name">{dish.name}</Box>
        <Divider className="field-label">Available in</Divider>
        <TagsList tags={dish.tags} />
        <Divider className="field-label">Ingredients</Divider>
        <IngredientsList
          className="ingredients-list"
          ingredients={dish.ingredients}
          amountLimit={5}
        />
      </Box>
      <Button
        onClick={callback}
        variant="secondaryContained"
        className="flip-card-button"
        endIcon={<ArrowForwardRounded />}>
        Show recipe
      </Button>
    </Box>
  );
};

export default DishCardFront;
