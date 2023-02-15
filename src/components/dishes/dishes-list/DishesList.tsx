import './DishesList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperRef from 'swiper';
import 'swiper/scss';
import { useQuery } from '@tanstack/react-query';
import { getDishes } from '../../../services/DishService';
import QueryResultsBuilder from '../../../utility/Builder';
import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { EffectCreative, Virtual } from 'swiper';
import DishCard from '../dish-card/DishCard';
import ErrorDishCard from '../dish-card/error-dish-card/ErrorDishCard';
import {
  LAST_RECIPE_BUTTON,
  LAST_RECIPE_IMAGE,
  LAST_RECIPE_TITLE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from '../../../constants/Constants';
import { queryClient } from '../../../services/QueryClient';
import { DISHES_QUERY } from '../../../constants/QueryConstants';

interface DishesListProps {
  className?: string;
  displayParameters?: string[];
}

const DishesList = ({ className }: DishesListProps) => {
  const { data: dishes, status } = useQuery(['DISHES_QUERY'], getDishes);
  const [swiperRef, setSwiperRef] = useState<SwiperRef | null>(null);
  const [isFrontSide, setFrontSide] = useState(true);
  const [slideId, setSlideId] = useState<number>(0);

  const flipCard = useCallback(() => {
    setFrontSide((prevState) => !prevState);
  }, []);

  const saveSlideId = () => {
    if (swiperRef) setSlideId(swiperRef.realIndex);
  };

  const goToFirstSlide = () => {
    if (swiperRef) swiperRef.slideTo(0);
  };

  const reloadDishRecipes = () => {
    queryClient.invalidateQueries([DISHES_QUERY]);
  };

  //const handleSwipe = () => {
  //if (dishes && displayParameters.includes(DISPLAY_PARAMS.SHUFFLE))
  //swiperRef?.slideTo(Math.floor(Math.random() * (dishes.length - 1)));
  //};

  return QueryResultsBuilder.createResult(status)
    .onSuccess(
      <Swiper
        modules={[Virtual, EffectCreative]}
        initialSlide={slideId}
        effect="creative"
        creativeEffect={{
          prev: { translate: [0, '-120%', -500] },
          next: { translate: [0, '120%', -500] }
        }}
        allowSlidePrev={isFrontSide}
        allowSlideNext={isFrontSide}
        onSwiper={setSwiperRef}
        onSlideChangeTransitionEnd={saveSlideId}
        slidesPerView={1}
        direction="vertical"
        virtual={{ enabled: true, cache: false, addSlidesAfter: 1, addSlidesBefore: 1 }}
        className={`dishes-list-container ${className}`}>
        {dishes &&
          dishes.slice().map((dish, id) => {
            return (
              <SwiperSlide key={id} virtualIndex={id}>
                <DishCard dish={dish} flipCallback={flipCard} isFrontSide={isFrontSide} />
              </SwiperSlide>
            );
          })}
        <SwiperSlide>
          <ErrorDishCard
            callback={goToFirstSlide}
            img={LAST_RECIPE_IMAGE}
            title={LAST_RECIPE_TITLE}
            caption={LAST_RECIPE_BUTTON}
          />
        </SwiperSlide>
      </Swiper>
    )
    .onError(
      <Box className={`dishes-list-container error ${className}`}>
        <ErrorDishCard
          callback={reloadDishRecipes}
          img={NO_RECIPES_IMAGE}
          title={NO_RECIPES_TITLE}
          caption={NO_RECIPES_BUTTON}
        />
      </Box>
    )
    .build();
};

export default DishesList;
