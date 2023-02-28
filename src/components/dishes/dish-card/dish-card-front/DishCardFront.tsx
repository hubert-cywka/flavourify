import { Box, Button, Divider, IconButton } from '@mui/material';
import './DishCardFront.scss';
import IngredientsList from '../../../ingredients/ingredients-list/IngredientsList';
import DishImage from '../../dish-image/DishImage';
import { DishCardProps } from '../DishCard';
import DishTags from '../../dish-tags/DishTags';
import { ArrowForwardRounded, RestaurantMenuRounded } from '@mui/icons-material';
import { addToMenu, getMenu } from '../../../../services/MenuService';
import { useSnackbar } from 'notistack';
import { Dish } from '../../../../interfaces/Dish';
import {
  DISH_ADD_TO_MENU_ERROR,
  DISH_ADD_TO_MENU_SUCCESS
} from '../../../../constants/DishesConstants';
import { MAX_MENU_SIZE } from '../../../../constants/NumberConstants';

const DishCardFront = ({ dish, className, flipCallback }: DishCardProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const addDishToMenu = (dish: Dish) => {
    if (getMenu().length >= MAX_MENU_SIZE) enqueueSnackbar(DISH_ADD_TO_MENU_ERROR);
    else {
      addToMenu(dish);
      enqueueSnackbar(DISH_ADD_TO_MENU_SUCCESS, { variant: 'success', preventDuplicate: false });
    }
  };

  return (
    <Box className={`dish-card-front-container ${className}`}>
      <Box className="image-container">
        <DishImage src={dish.img} altText={dish.name} className="dish-image" />
        <IconButton className="add-to-menu-button" onClick={() => addDishToMenu(dish)}>
          <RestaurantMenuRounded />
        </IconButton>
      </Box>
      <Box className="dish-card-content-container">
        <Divider className="field-label">Name</Divider>
        <Box className="dish-name">{dish.name}</Box>
        <Divider className="field-label">Available in</Divider>
        <DishTags tags={dish.tags} />
        <Divider className="field-label">Ingredients</Divider>
        <IngredientsList
          className="ingredients-list"
          ingredients={dish.ingredients}
          amountLimit={5}
        />
      </Box>
      <Button
        onClick={flipCallback}
        variant="contained"
        className="flip-card-button"
        endIcon={<ArrowForwardRounded />}>
        Show recipe
      </Button>
    </Box>
  );
};

export default DishCardFront;
