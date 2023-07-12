import { Box, Button, Divider } from '@mui/material';
import './DishCardFront.scss';
import IngredientsList from 'components/ingredients/ingredients-list/IngredientsList';
import TagsList from 'components/tags/tags-list/TagsList';
import DishImage from 'components/dishes/dish-image/DishImage';
import { DishCardProps } from 'components/dishes/dish-card/DishCard';
import { ArrowForwardRounded } from '@mui/icons-material';
import classNames from 'classnames';
import { memo } from 'react';

const DishCardFront = ({ dish, className, callback }: DishCardProps) => {
  return (
    <Box className={classNames('dish-card-front-container', className)}>
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

export default memo(DishCardFront);
