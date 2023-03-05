import './FoundDishPage.scss';
import { Box } from '@mui/material';
import DishCard from '../../dishes/dish-card/DishCard';
import { useQuery } from '@tanstack/react-query';
import { DISH_QUERY, DISHES_QUERY } from '../../../constants/QueryConstants';
import { useParams } from 'react-router';
import { getDish } from '../../../services/DishService';
import Builder from '../../../utility/Builder';
import { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  DISH_SEARCH_DONE_BUTTON,
  DISH_SEARCH_DONE_IMAGE,
  DISH_SEARCH_DONE_TITLE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from '../../../constants/DishesConstants';
import appRouter from '../../router/AppRouter';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';
import ErrorDishCard from '../../dishes/dish-card/other-variants/error-dish-card/ErrorDishCard';
import { AnimatePresence, motion } from 'framer-motion';
import { FOUND_DISH_PAGE_MOTION } from '../../../constants/MotionKeyConstants';

const FoundDishPage = () => {
  const { id } = useParams();

  const {
    data: dish,
    status,
    refetch
  } = useQuery([DISHES_QUERY, DISH_QUERY, { id: id }], () => getDish(id ? parseInt(id) : 0));
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
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence>
        <motion.div
          className="found-dish-page-container"
          key={FOUND_DISH_PAGE_MOTION}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <TopNavbar className="top-navbar" singleDishVariant />
          {getQueryResults()}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default FoundDishPage;
