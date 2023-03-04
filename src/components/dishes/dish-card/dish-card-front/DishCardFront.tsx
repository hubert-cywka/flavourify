import { Box, Button, Divider } from '@mui/material';
import './DishCardFront.scss';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishImage from '../../dish-image/DishImage';
import { DishCardProps } from '../DishCard';
import { ArrowForwardRounded } from '@mui/icons-material';
import { addToMenu, getMenu } from '../../../../services/MenuService';
import { useSnackbar } from 'notistack';
import { Dish } from '../../../../interfaces/Dish';
import {
  DISH_ADD_TO_MENU_ERROR,
  DISH_ADD_TO_MENU_SUCCESS
} from '../../../../constants/DishesConstants';
import { MAX_MENU_SIZE } from '../../../../constants/NumberConstants';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import TagsList from '../../../tags/tags-list/TagsList';

const DishCardFront = ({ dish, className, flipCallback }: DishCardProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const addDishToMenu = (dish: Dish) => {
    if (getMenu().length >= MAX_MENU_SIZE) enqueueSnackbar(DISH_ADD_TO_MENU_ERROR);
    else {
      addToMenu(dish);
      enqueueSnackbar(DISH_ADD_TO_MENU_SUCCESS, { variant: 'success', preventDuplicate: false });
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => addDishToMenu(dish),
    delta: 50,
    swipeDuration: 250,
    trackMouse: true
  });
  return (
    <motion.div drag={'y'} dragConstraints={{ top: 0, bottom: 0 }}>
      <Box {...swipeHandlers} className={`dish-card-front-container ${className}`}>
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
          onClick={flipCallback}
          variant="secondaryContained"
          className="flip-card-button"
          endIcon={<ArrowForwardRounded />}>
          Show recipe
        </Button>
      </Box>
    </motion.div>
  );
};

export default DishCardFront;
