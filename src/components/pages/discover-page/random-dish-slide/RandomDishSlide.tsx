import Builder from '../../../../utility/Builder';
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
  const { data, status, refetch } = useQuery(
    [DISHES_QUERY, RANDOM_DISHES_QUERY],
    () => getRandomDishes(1),
    {
      refetchOnWindowFocus: false
    }
  );

  const navigateToRecipe = (id: number) => {
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  const buildRandomDishCards = () => {
    return Builder.createResult(status)
      .onSuccess(
        <Box>
          {data && (
            <>
              <Typography className="caption">Loved by many. One of many.</Typography>
              <DishMiniCard
                className="mini-dish-card"
                dish={data[0]}
                onClick={() => navigateToRecipe(data[0].id)}
              />
            </>
          )}
        </Box>
      )
      .onError(<Skeleton variant="rectangular" className="mini-dish-card" />)
      .onLoading(<Skeleton variant="rectangular" className="mini-dish-card" />)
      .build();
  };

  return (
    <Box className="slide-container">
      <Typography className="header">Be inspired.</Typography>
      {buildRandomDishCards()}
      <Box className="slide-bottom-container">
        <Typography className="bottom-caption">Get inspired, again.</Typography>
        <Button
          endIcon={<TipsAndUpdatesRoundedIcon />}
          variant="contained"
          sx={{ bgcolor: 'secondary.main' }}
          className="action-button"
          onClick={() => refetch()}>
          Inspire
        </Button>
      </Box>
    </Box>
  );
};

export default RandomDishSlide;
