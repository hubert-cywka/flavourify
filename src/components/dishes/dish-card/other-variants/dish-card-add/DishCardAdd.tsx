import DishCardBack from '../../dish-card-back/DishCardBack';
import { Dish } from '../../../../../types/interfaces/Dish';
import {
  DISH_IMAGE_PLACEHOLDER,
  DISH_NAME_PLACEHOLDER,
  DISH_TAGS_DEFAULT
} from '../../../../../constants/DishesConstants';
import { Box } from '@mui/material';
import './DishCardAdd.scss';

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
    <Box
      sx={{ color: 'text.primary', bgcolor: 'primary.main', borderRadius: '10px' }}
      className={className}>
      <DishCardBack
        dish={EMPTY_DISH_PLACEHOLDER}
        addMode={true}
        className={`dish-card-add-container ${className}`}
        onQuerySuccess={onClose}
      />
    </Box>
  );
};

export default DishCardAdd;
