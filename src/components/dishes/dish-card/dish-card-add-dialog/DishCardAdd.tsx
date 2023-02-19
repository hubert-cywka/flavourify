import DishCardBack from '../dish-card-back/DishCardBack';
import { Dish } from '../../../../interfaces/Dish';
import {
  DISH_TAGS_DEFAULT,
  DISH_IMAGE_PLACEHOLDER,
  DISH_NAME_PLACEHOLDER
} from '../../../../constants/Constants';

const EMPTY_DISH_PLACEHOLDER: Dish = {
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
