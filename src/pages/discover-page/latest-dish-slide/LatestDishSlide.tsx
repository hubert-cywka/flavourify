import { Box, Button, Skeleton, Typography } from '@mui/material';
import Builder from 'shared/utility/Builder';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import '../SlidesShared.scss';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import DishMiniCard from 'components/dishes/dish-card/other-variants/dish-mini-card/DishMiniCard';
import { useLatestDish } from 'shared/hooks/queries/useLatestDish';

const LatestDishSlide = () => {
  const { data, status } = useLatestDish();

  const navigateToRecipe = (id: number) => {
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  return (
    <Box className="slide-container">
      <Typography className="header">Discover.</Typography>
      {Builder.createResult(status)
        .onSuccess(
          <Box className="mini-dish-card-container">
            {data && (
              <DishMiniCard
                onClick={() => navigateToRecipe(data.id)}
                className="mini-dish-card"
                dish={data}
              />
            )}
          </Box>
        )
        .onError(<Skeleton variant="rectangular" className="mini-dish-card" />)
        .onLoading(<Skeleton variant="rectangular" className="mini-dish-card" />)
        .build()}
      <Box className="slide-bottom-container">
        <Typography className="bottom-caption">Check all our recipes.</Typography>
        <Button
          endIcon={<MeetingRoomRoundedIcon />}
          variant="secondaryContained"
          className="action-button"
          onClick={() => appRouter.navigate(ROUTE.LANDING)}>
          I am in
        </Button>
      </Box>
    </Box>
  );
};

export default LatestDishSlide;
