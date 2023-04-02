import DishCardFront from './dish-card-front/DishCardFront';
import DishCardBack from './dish-card-back/DishCardBack';
import { Dish } from '../../../types/interfaces/Dish';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { addToMenu, getMenu } from '../../../services/MenuService';
import { MAX_MENU_SIZE } from '../../../constants/NumberConstants';
import {
  DISH_ADD_TO_MENU_ERROR,
  DISH_ADD_TO_MENU_SUCCESS
} from '../../../constants/DishesConstants';
import { useSwipeable } from 'react-swipeable';
import './DishCard.scss';
import {
  DISH_BACK_SIDE_MOTION,
  DISH_FRONT_SIDE_MOTION
} from '../../../constants/MotionKeyConstants';

export interface DishCardProps {
  dish: Dish;
  isFrontSide?: boolean;
  flipCallback?: () => void;
  className?: string;
}

const DishCard = ({ dish, flipCallback, isFrontSide }: DishCardProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const addDishToMenu = (dish: Dish) => {
    if (!isFrontSide) return;
    if (getMenu().length >= MAX_MENU_SIZE) enqueueSnackbar(DISH_ADD_TO_MENU_ERROR);
    else {
      addToMenu(dish);
      enqueueSnackbar(DISH_ADD_TO_MENU_SUCCESS, { variant: 'success', preventDuplicate: false });
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => addDishToMenu(dish),
    delta: 50,
    swipeDuration: 250,
    trackMouse: true
  });

  return (
    <motion.div drag={'x'} dragConstraints={{ left: 0, right: 0 }}>
      <Box {...swipeHandlers} className="dish-card">
        <AnimatePresence initial={false} mode={'popLayout'}>
          {isFrontSide && (
            <motion.div
              key={DISH_FRONT_SIDE_MOTION}
              className="dish-card-side"
              initial={{ translateX: '120%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '120%', opacity: 0 }}
              transition={{ bounce: 0, duration: 0.3 }}>
              <DishCardFront flipCallback={flipCallback} dish={dish} className="dish-card-side" />
            </motion.div>
          )}
          {!isFrontSide && (
            <motion.div
              key={DISH_BACK_SIDE_MOTION}
              className="dish-card-side"
              initial={{ translateX: '-120%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '-120%', opacity: 0 }}
              transition={{ bounce: 0, duration: 0.3 }}>
              <DishCardBack flipCallback={flipCallback} dish={dish} className="dish-card-side" />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default DishCard;
