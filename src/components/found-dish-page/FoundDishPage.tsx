import './FoundDishPage.scss';
import { Box } from '@mui/material';
import DishCard from '../dishes/dish-card/DishCard';
import { useQuery } from '@tanstack/react-query';
import { DISH_QUERY } from '../../constants/QueryConstants';
import { useParams } from 'react-router';
import { getDish } from '../../services/DishService';
import Builder from '../../utility/Builder';
import { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ErrorDishCard from '../dishes/dish-card/error-dish-card/ErrorDishCard';
import {
  DISH_SEARCH_DONE_BUTTON,
  DISH_SEARCH_DONE_IMAGE,
  DISH_SEARCH_DONE_TITLE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from '../../constants/DishesConstants';
import appRouter from '../router/AppRouter';
import TopNavbar from '../navbars/top-navbar/TopNavbar';

const FoundDishPage = () => {
  const { id } = useParams();

  const { data: dish, status, refetch } = useQuery([DISH_QUERY, { id: id }], () => getDish(id));
  const [isFrontSide, setFrontSide] = useState(true);

  const flipCard = useCallback(() => {
    setFrontSide((prevState) => !prevState);
  }, []);

  const getQueryResults = () => {
    return Builder.createResult(status)
      .onSuccess(
        <Swiper
          allowSlideNext={isFrontSide}
          allowSlidePrev={isFrontSide}
          direction="vertical"
          className="slides-container">
          {dish && (
            <SwiperSlide>
              <DishCard dish={dish} flipCallback={flipCard} isFrontSide={isFrontSide} />
            </SwiperSlide>
          )}
          <SwiperSlide>
            <ErrorDishCard
              title={DISH_SEARCH_DONE_TITLE}
              callback={() => appRouter.navigate(-1)}
              caption={DISH_SEARCH_DONE_BUTTON}
              img={DISH_SEARCH_DONE_IMAGE}
            />
          </SwiperSlide>
        </Swiper>
      )
      .onError(
        <Box className="slides-container">
          <ErrorDishCard
            title={NO_RECIPES_TITLE}
            callback={refetch}
            caption={NO_RECIPES_BUTTON}
            img={NO_RECIPES_IMAGE}
          />
        </Box>
      )
      .build();
  };

  return (
    <Box
      className="found-dish-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <TopNavbar className="top-navbar" singleDishVariant />
      {getQueryResults()}
    </Box>
  );
};

export default FoundDishPage;
