import DishCardBack from '../dish-card-back/DishCardBack';
import { Dish } from '../../../../interfaces/Dish';
import './DishCardAddDialog.scss';
import { DISH_IMAGE_PLACEHOLDER, DISH_NAME_PLACEHOLDER } from '../../../../constants/Constants';
import { Dialog, Box } from '@mui/material';
import React from 'react';

const EMPTY_DISH_PLACEHOLDER: Dish = {
  name: DISH_NAME_PLACEHOLDER,
  recipe: [],
  ingredients: [],
  img: DISH_IMAGE_PLACEHOLDER
};

interface DishCardAddDialogProps {
  onClose: () => void;
  open: boolean;
}

const DishCardAdd = ({ onClose, open }: DishCardAddDialogProps) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="dish-card-add-dialog"
      onClick={onClose}
      PaperProps={{
        style: {
          minHeight: '100%',
          minWidth: '100%',
          backgroundColor: 'transparent'
        }
      }}>
      <Box onClick={(e) => handleClose(e)} className="dish-card-add-container">
        <DishCardBack
          dish={EMPTY_DISH_PLACEHOLDER}
          addMode={true}
          className="dish-card-add"
          onQuerySuccess={onClose}
        />
      </Box>
    </Dialog>
  );
};

export default DishCardAdd;
