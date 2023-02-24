import DishCardBack from '../dish-card-back/DishCardBack';
import { Dish } from '../../../../interfaces/Dish';
import {
  DISH_IMAGE_PLACEHOLDER,
  DISH_NAME_PLACEHOLDER,
  DISH_TAGS_DEFAULT
} from '../../../../constants/DishesConstants';

const EMPTY_DISH_PLACEHOLDER: Dish = {
  id: -1,
  name: DISH_NAME_PLACEHOLDER,
  recipe: [],
  ingredients: [],
  img: DISH_IMAGE_PLACEHOLDER,
  tags: DISH_TAGS_DEFAULT
};

interface DishCardAddDialogProps {
  onClose: () => void;
  className?: string;
}

const DishCardAdd = ({ onClose, className }: DishCardAddDialogProps) => {
  return (
    <DishCardBack
      dish={EMPTY_DISH_PLACEHOLDER}
      addMode={true}
      className={className}
      onQuerySuccess={onClose}
    />
  );
};

export default DishCardAdd;
