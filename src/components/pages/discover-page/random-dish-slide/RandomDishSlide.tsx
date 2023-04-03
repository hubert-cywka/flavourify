import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DISHES_QUERY, RANDOM_DISHES_QUERY } from '../../../../constants/QueryConstants';
import { getRandomDishes } from '../../../../services/DishService';
import appRouter from '../../../router/AppRouter';
import ROUTE from '../../../router/RoutingConstants';
import '../SlidesShared.scss';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import DishMiniCard from '../../../dishes/dish-card/other-variants/dish-mini-card/DishMiniCard';

const RandomDishSlide = () => {
  const { data, refetch, isFetching } = useQuery(
    [DISHES_QUERY, RANDOM_DISHES_QUERY],
    () => getRandomDishes(1),
    {
      refetchOnWindowFocus: false
    }
  );

  const navigateToRecipe = (id: number) => {
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  return (
    <Box className="slide-container">
      <Typography className="header">Be inspired.</Typography>
      <Typography className="caption">Loved by many. One of many.</Typography>
      <Box className="mini-dish-card-container">
        {data && !isFetching ? (
          <DishMiniCard
            className="mini-dish-card"
            dish={data[0]}
            onClick={() => navigateToRecipe(data[0].id)}
          />
        ) : (
          <Skeleton variant="rectangular" className="mini-dish-card" />
        )}
      </Box>
      <Box className="slide-bottom-container">
        <Typography className="bottom-caption">Get inspired, again.</Typography>
        <Button
          endIcon={<TipsAndUpdatesRoundedIcon />}
          variant="secondaryContained"
          className="action-button"
          onClick={() => refetch()}>
          Inspire
        </Button>
      </Box>
    </Box>
  );
};

export default RandomDishSlide;
