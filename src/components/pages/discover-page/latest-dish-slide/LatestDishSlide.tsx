import Builder from '../../../../utility/Builder';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import appRouter from '../../../router/AppRouter';
import ROUTE from '../../../router/RoutingConstants';
import '../SlidesShared.scss';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import DishMiniCard from '../../../dishes/dish-card/other-variants/dish-mini-card/DishMiniCard';
import { useLatestDish } from '../../../../utility/hooks/useLatestDish';

const LatestDishSlide = () => {
  const { data, status } = useLatestDish();

  const navigateToRecipe = (id: number) => {
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  const buildLatestDishCard = () => {
    return Builder.createResult(status)
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
      .build();
  };

  return (
    <Box className="slide-container">
      <Typography className="header">Discover.</Typography>
      {buildLatestDishCard()}
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
