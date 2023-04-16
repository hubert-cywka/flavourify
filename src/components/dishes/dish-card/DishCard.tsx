import DishCardFront from './dish-card-front/DishCardFront';
import DishCardBack from './dish-card-back/DishCardBack';
import { Dish } from '../../../types/interfaces/Dish';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { addToMenu, getMenu } from '../../../services/MenuService';
import { MAX_MENU_SIZE, SWIPE_RIGHT_BOUND } from '../../../constants/NumberConstants';
import {
  DISH_ADD_TO_MENU_ERROR,
  DISH_ADD_TO_MENU_SUCCESS
} from '../../../constants/DishesConstants';
import './DishCard.scss';
import {
  DISH_BACK_SIDE_MOTION,
  DISH_FRONT_SIDE_MOTION
} from '../../../constants/MotionKeyConstants';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import { calculateSwipePosition } from '../../../utility/calculateSwipePosition';
import { to } from 'react-spring';
import { Box, Dialog } from '@mui/material';

export interface DishCardProps {
  dish: Dish;
  isFrontSide?: boolean;
  flipCallback?: () => void;
  className?: string;
}

const DishCard = ({ dish, flipCallback, isFrontSide }: DishCardProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [swipeTriggered, setSwipeTriggered] = useState(false);

  const [{ x, rotation }, api] = useSpring(() => ({ x: 0, rotation: 0 }));
  const swipeHandlers = useDrag(
    ({ down, active, movement: [xAxis] }) => {
      api.start({
        x: down ? calculateSwipePosition(xAxis, SWIPE_RIGHT_BOUND) : 0,
        rotation: down ? calculateSwipePosition(xAxis, SWIPE_RIGHT_BOUND) / 10 : 0
      });
      if (active && xAxis >= SWIPE_RIGHT_BOUND) setSwipeTriggered(true);
      if (!active && swipeTriggered) {
        setSwipeTriggered(false);
        addDishToMenu();
      }
    },
    {
      axis: 'lock'
    }
  );

  const addDishToMenu = () => {
    if (!isFrontSide) return;
    if (getMenu().length >= MAX_MENU_SIZE) enqueueSnackbar(DISH_ADD_TO_MENU_ERROR);
    else {
      addToMenu(dish);
      enqueueSnackbar(DISH_ADD_TO_MENU_SUCCESS, { variant: 'success', preventDuplicate: false });
    }
  };

  const transform = (r: number) => `perspective(1500px) rotateY(${r}deg) rotateZ(${r}deg)`;

  return (
    <animated.div
      {...swipeHandlers()}
      style={{ x, transform: to([rotation], transform) }}
      className="dish-card">
      <AnimatePresence initial={false} mode="popLayout">
        {isFrontSide ? (
          <motion.div
            key={DISH_FRONT_SIDE_MOTION}
            className="dish-card-motion"
            initial={{ translateX: '120%', opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: '120%', opacity: 0 }}
            transition={{ bounce: 0, duration: 0.3 }}>
            <BookmarkAddRoundedIcon className="add-to-menu-button" onClick={addDishToMenu} />
            <DishCardFront flipCallback={flipCallback} dish={dish} className="dish-card-side" />
          </motion.div>
        ) : (
          <Dialog
            open={true}
            PaperProps={{
              sx: { background: 'none', boxShadow: 'none' },
              className: 'dish-card-back-dialog'
            }}>
            <motion.div
              key={DISH_BACK_SIDE_MOTION}
              className="dish-card-motion"
              initial={{ translateX: '-120%', opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: '-120%', opacity: 0 }}
              transition={{ bounce: 0, duration: 0.3 }}>
              <Box sx={{ bgcolor: 'primary.main' }}>
                <DishCardBack flipCallback={flipCallback} dish={dish} className="dish-card-side" />
              </Box>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </animated.div>
  );
};

export default DishCard;
