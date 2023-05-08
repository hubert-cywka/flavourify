import DishCardFront from './dish-card-front/DishCardFront';
import DishCardBack from './dish-card-back/DishCardBack';
import { Dish } from '../../../types/interfaces/Dish';
import { useSnackbar } from 'notistack';
import { addToMenu, getMenu } from '../../../services/MenuService';
import { MAX_MENU_SIZE, SWIPE_RIGHT_BOUND } from '../../../constants/NumberConstants';
import {
  DISH_ADD_TO_MENU_ERROR,
  DISH_ADD_TO_MENU_SUCCESS
} from '../../../constants/DishesConstants';
import './DishCard.scss';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import { calculateSwipePosition } from '../../../utility/calculateSwipePosition';
import { to } from 'react-spring';
import { Box, Dialog } from '@mui/material';
import AnimatePresence from '../../animate-presence/AnimatePresence';
import {
  simpleOpacityAnimation,
  slideFromRightAnimation,
  slideFromLeftAnimation
} from '../../../constants/AnimationConfigs';

export interface DishCardProps {
  dish: Dish;
  isLocked?: boolean;
  callback?: () => void;
  className?: string;
}

const DishCard = ({ dish, callback, isLocked }: DishCardProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [swipeTriggered, setSwipeTriggered] = useState(false);
  const [isFrontSide, setIsFrontSide] = useState(true);

  const [{ x, rotation }, api] = useSpring(() => ({ x: 0, rotation: 0 }));
  const swipeHandlers = useDrag(
    ({ down, active, movement: [xAxis] }) => {
      api.start({
        x: down ? calculateSwipePosition(xAxis, SWIPE_RIGHT_BOUND) : 0,
        rotation: down ? calculateSwipePosition(xAxis, SWIPE_RIGHT_BOUND) / 10 : 0
      });
      if (active && xAxis >= SWIPE_RIGHT_BOUND) {
        setSwipeTriggered(true);
      } else if (!active && swipeTriggered) {
        setSwipeTriggered(false);
        addDishToMenu();
      }
    },
    {
      axis: 'lock'
    }
  );

  const addDishToMenu = () => {
    if (isLocked) return;
    if (getMenu().length >= MAX_MENU_SIZE) {
      enqueueSnackbar(DISH_ADD_TO_MENU_ERROR);
    } else {
      addToMenu(dish);
      enqueueSnackbar(dish.name + DISH_ADD_TO_MENU_SUCCESS, {
        variant: 'success',
        preventDuplicate: false
      });
    }
  };

  const handleCallback = () => {
    setIsFrontSide((prev) => !prev);
    if (callback) callback();
  };

  const dragRotationTransform = (r: number) =>
    `perspective(1500px) rotateY(${r}deg) rotateZ(${r}deg)`;

  return (
    <animated.div
      {...swipeHandlers()}
      style={{ x, transform: to([rotation], dragRotationTransform) }}
      className="dish-card">
      <AnimatePresence
        className="dish-card-motion"
        isVisible={isFrontSide}
        animation={slideFromRightAnimation}>
        <BookmarkAddRoundedIcon className="add-to-menu-button" onClick={addDishToMenu} />
        <DishCardFront callback={handleCallback} dish={dish} className="dish-card-side" />
      </AnimatePresence>

      <AnimatePresence isVisible={!isFrontSide} animation={simpleOpacityAnimation}>
        <Dialog
          open={true}
          PaperProps={{
            sx: { background: 'none', boxShadow: 'none' },
            className: 'dish-card-back-dialog'
          }}>
          <AnimatePresence isVisible={!isFrontSide} animation={slideFromLeftAnimation}>
            <Box className="dish-card-motion" sx={{ bgcolor: 'primary.main' }}>
              <DishCardBack callback={handleCallback} dish={dish} className="dish-card-side" />
            </Box>
          </AnimatePresence>
        </Dialog>
      </AnimatePresence>
    </animated.div>
  );
};

export default DishCard;
