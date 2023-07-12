import { useSnackbar } from 'notistack';
import DishCardBack from 'components/dishes/dish-card/dish-card-back/DishCardBack';
import DishCardFront from 'components/dishes/dish-card/dish-card-front/DishCardFront';
import { DISH_ADD_TO_MENU_ERROR, DISH_ADD_TO_MENU_SUCCESS } from 'shared/constants/DishesConstants';
import { MAX_MENU_SIZE, SWIPE_RIGHT_BOUND } from 'shared/constants/NumberConstants';
import { addToMenu, getMenu } from 'services/MenuService';
import { Dish } from 'shared/types/Dish';
import './DishCard.scss';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { ComponentProps, useCallback, useState } from 'react';
import { calculateSwipePosition } from 'shared/utility/calculateSwipePosition';
import { to } from 'react-spring';
import { Box, Dialog, Fade, Slide } from '@mui/material';

export interface DishCardProps extends ComponentProps<'div'> {
  dish: Dish;
  isLocked?: boolean;
  callback?: () => void;
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

  const handleCallback = useCallback(() => {
    setIsFrontSide((prev) => !prev);
    if (callback) callback();
  }, [callback, isFrontSide]);

  const dragRotationTransform = (r: number) =>
    `perspective(1500px) rotateY(${r}deg) rotateZ(${r}deg)`;

  return (
    <animated.div
      {...swipeHandlers()}
      style={{ x, transform: to([rotation], dragRotationTransform) }}
      className="dish-card">
      <Slide in={isFrontSide} direction="left" appear={false}>
        <Box className="dish-card-motion">
          <BookmarkAddRoundedIcon className="add-to-menu-button" onClick={addDishToMenu} />
          <DishCardFront callback={handleCallback} dish={dish} className="dish-card-side" />
        </Box>
      </Slide>

      <Fade in={!isFrontSide} unmountOnExit={true} mountOnEnter={true}>
        <Box>
          <Dialog
            open={true}
            PaperProps={{
              sx: { background: 'none', boxShadow: 'none' },
              className: 'dish-card-back-dialog'
            }}>
            <Slide in={!isFrontSide} direction="right">
              <Box className="dish-card-motion" sx={{ bgcolor: 'primary.main' }}>
                <DishCardBack callback={handleCallback} dish={dish} className="dish-card-side" />
              </Box>
            </Slide>
          </Dialog>
        </Box>
      </Fade>
    </animated.div>
  );
};

export default DishCard;
