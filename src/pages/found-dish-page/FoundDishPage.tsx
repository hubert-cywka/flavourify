import './FoundDishPage.scss';
import { useState } from 'react';
import { Box } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { simpleOpacityAnimation } from 'shared/constants/AnimationConfigs';
import {
  DISH_SEARCH_DONE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from 'shared/constants/DishesConstants';
import { SWIPE_UP_BOUND } from 'shared/constants/NumberConstants';
import Builder from 'shared/utility/Builder';
import { calculateSwipePosition } from 'shared/utility/calculateSwipePosition';
import DishCard from 'components/dishes/dish-card/DishCard';
import ErrorDishCard from 'components/dishes/dish-card/other-variants/error-dish-card/ErrorDishCard';
import TopNavbar from 'components/navbars/top-navbar/TopNavbar';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import AnimatePresence from 'components/animate-presence/AnimatePresence';
import { useDish } from 'shared/hooks/queries/useDish';

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

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence
        className="found-dish-page-container"
        isVisible={true}
        animation={simpleOpacityAnimation}>
        <TopNavbar className="top-navbar" searchValue={dish && dish.name} singleDishVariant />
        <Box className="slide-container">
          {Builder.createResult(status)
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
            .build()}
        </Box>
      </AnimatePresence>
    </Box>
  );
};

export default FoundDishPage;
