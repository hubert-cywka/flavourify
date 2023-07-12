import { Box, Dialog } from '@mui/material';
import { DISH_IMAGE_PLACEHOLDER, DISH_TAGS_DEFAULT } from 'shared/constants/DishesConstants';
import { Dish } from 'shared/types/Dish';
import DishCardBack from 'components/dishes/dish-card/dish-card-back/DishCardBack';
import './DishCardAddDialog.scss';
import { ComponentProps, memo } from 'react';
import classNames from 'classnames';

const EMPTY_DISH_PLACEHOLDER: Dish = {
  id: -1,
  name: '',
  recipe: [],
  ingredients: [],
  img: DISH_IMAGE_PLACEHOLDER,
  tags: DISH_TAGS_DEFAULT
};

interface DishCardAddDialogProps extends ComponentProps<'div'> {
  onClose: () => void;
  open: boolean;
}

const DishCardAddDialog = ({ onClose, className, open }: DishCardAddDialogProps) => {
  return (
    <Dialog PaperProps={{ className: 'dish-card-back-dialog' }} open={open} onClose={onClose}>
      <Box sx={{ color: 'text.primary', bgcolor: 'primary.main', width: '100%' }}>
        <DishCardBack
          className={classNames('dish-card-side', className)}
          dish={EMPTY_DISH_PLACEHOLDER}
          onMutationSuccess={onClose}
          addMode={true}
        />
      </Box>
    </Dialog>
  );
};

export default memo(DishCardAddDialog);
