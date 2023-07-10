import { Box, Button, Skeleton, Typography } from '@mui/material';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import '../SlidesShared.scss';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import DishMiniCard from 'components/dishes/dish-card/other-variants/dish-mini-card/DishMiniCard';
import { useRandomDish } from 'shared/hooks/queries/useRandomDish';

const RandomDishSlide = () => {
  const { data, refetch, isFetching } = useRandomDish();

  const navigateToRecipe = (id: number) => {
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  const buildRandomDishCard = () => {
    return data && !isFetching ? (
      <DishMiniCard
        className="mini-dish-card"
        dish={data[0]}
        onClick={() => navigateToRecipe(data[0].id)}
      />
    ) : (
      <Skeleton variant="rectangular" className="mini-dish-card" />
    );
  };

  return (
    <Box className="slide-container">
      <Typography className="header">Inspire.</Typography>
      <Box className="mini-dish-card-container">{buildRandomDishCard()}</Box>
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
