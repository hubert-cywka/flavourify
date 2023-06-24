import { Box, Dialog } from '@mui/material';
import { DISH_IMAGE_PLACEHOLDER, DISH_TAGS_DEFAULT } from 'constants/DishesConstants';
import { Dish } from 'types/interfaces/Dish';
import DishCardBack from 'components/dishes/dish-card/dish-card-back/DishCardBack';
import './DishCardAddDialog.scss';

const EMPTY_DISH_PLACEHOLDER: Dish = {
  id: -1,
  name: '',
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
          onMutationSuccess={onClose}
        />
      </Box>
    </Dialog>
  );
};

export default DishCardAddDialog;
