import './FoundDishPage.scss';
import { Box } from '@mui/material';
import DishCard from '../../dishes/dish-card/DishCard';
import { useParams } from 'react-router';
import Builder from '../../../utility/Builder';
import { useState } from 'react';
import {
  DISH_SEARCH_DONE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from '../../../constants/DishesConstants';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';
import ErrorDishCard from '../../dishes/dish-card/other-variants/error-dish-card/ErrorDishCard';
import { enqueueSnackbar } from 'notistack';
import appRouter from '../../router/AppRouter';
import ROUTE from '../../router/RoutingConstants';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { SWIPE_UP_BOUND } from '../../../constants/NumberConstants';
import { calculateSwipePosition } from '../../../utility/calculateSwipePosition';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import AnimatePresence from '../../animate-presence/AnimatePresence';
import { useDish } from '../../../utility/hooks/useDish';

const FoundDishPage = () => {
  const { id } = useParams();
  const { data: dish, status, refetch } = useDish(id ? parseInt(id) : 0);
  const [swipesCount, setSwipesCount] = useState(0);
  const [swipeTriggered, setSwipeTriggered] = useState(false);

  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const swipeHandlers = useDrag(
    ({ down, active, movement: [, yAxis] }) => {
      api.start({ y: down ? calculateSwipePosition(yAxis, SWIPE_UP_BOUND) : 0 });
      if (active && yAxis <= SWIPE_UP_BOUND) setSwipeTriggered(true);
      if (!active && swipeTriggered) {
        setSwipeTriggered(false);
        handleSwipeUp();
      }
    },
    {
      axis: 'lock'
    }
  );

  const handleSwipeUp = () => {
    if (swipesCount === 0) {
      setSwipesCount(1);
      enqueueSnackbar(DISH_SEARCH_DONE, { variant: 'info' });
    } else {
      appRouter.navigate(ROUTE.LANDING);
    }
  };

  const buildFoundDish = () => {
    return Builder.createResult(status)
      .onSuccess(
        <animated.div {...swipeHandlers()} style={{ y }} className="found-dish-container">
          {dish && <DishCard dish={dish} />}
        </animated.div>
      )
      .onError(
        <ErrorDishCard
          title={NO_RECIPES_TITLE}
          callback={refetch}
          caption={NO_RECIPES_BUTTON}
          img={NO_RECIPES_IMAGE}
        />
      )
      .build();
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence
        className="found-dish-page-container"
        isVisible={true}
        animation={simpleOpacityAnimation}>
        <TopNavbar className="top-navbar" searchValue={dish && dish.name} singleDishVariant />
        <Box className="slide-container">{buildFoundDish()}</Box>
      </AnimatePresence>
    </Box>
  );
};

export default FoundDishPage;
