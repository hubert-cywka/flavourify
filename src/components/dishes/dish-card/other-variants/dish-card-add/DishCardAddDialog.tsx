import DishCardBack from '../../dish-card-back/DishCardBack';
import { Dish } from '../../../../../types/interfaces/Dish';
import {
  DISH_IMAGE_PLACEHOLDER,
  DISH_NAME_PLACEHOLDER,
  DISH_TAGS_DEFAULT
} from '../../../../../constants/DishesConstants';
import { Box, Dialog } from '@mui/material';
import './DishCardAddDialog.scss';

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
  open: boolean;
  className?: string;
}

const DishCardAddDialog = ({ onClose, className, open }: DishCardAddDialogProps) => {
  return (
    <Dialog PaperProps={{ className: 'dish-card-back-dialog' }} open={open} onClose={onClose}>
      <Box sx={{ color: 'text.primary', bgcolor: 'primary.main', width: '100%' }}>
        <DishCardBack
          dish={EMPTY_DISH_PLACEHOLDER}
          addMode={true}
          className={`dish-card-side ${className}`}
          onQuerySuccess={onClose}
        />
      </Box>
    </Dialog>
  );
};

export default DishCardAddDialog;