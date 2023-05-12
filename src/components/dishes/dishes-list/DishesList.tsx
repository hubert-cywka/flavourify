import './DishesList.scss';
import { Dish } from '../../../types/interfaces/Dish';
import {
  LAST_RECIPE_BUTTON,
  LAST_RECIPE_IMAGE,
  LAST_RECIPE_TITLE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from '../../../constants/DishesConstants';
import { DishesPage } from '../../../services/DishService';
import DishCard from '../dish-card/DishCard';
import Builder from '../../../utility/Builder';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from '@mui/material';
import SwiperRef from 'swiper';
import { useState } from 'react';
import ErrorDishCard from '../dish-card/other-variants/error-dish-card/ErrorDishCard';
import { useDishes } from '../../../utility/hooks/queries/useDishes';

interface DishesListProps {
  className?: string;
}

const DishesList = ({ className }: DishesListProps) => {
  const [isLocked, setIsLocked] = useState(false);
  const [swiperRef, setSwiperRef] = useState<SwiperRef | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    isFetching,
    status,
    refetch,
    lastViewedDish,
    setLastViewedDish
  } = useDishes();

  const switchLock = () => {
    setIsLocked((prevState) => !prevState);
  };

  const updateLastViewedDish = () => {
    if (swiperRef) setLastViewedDish({ ...lastViewedDish, slide: swiperRef.activeIndex });
  };

  const goToFirstSlide = () => {
    if (swiperRef) swiperRef.slideTo(0);
  };

  const prepareDishesSlides = (dishPages: DishesPage[]) => {
    const extractedDishes: Dish[] = [];
    dishPages.forEach((page) => {
      extractedDishes.push(...page.dishes);
    });

    return extractedDishes.map((dish) => {
      return (
        <SwiperSlide key={dish.id} virtualIndex={dish.id}>
          <DishCard dish={dish} callback={switchLock} isLocked={isLocked} />
        </SwiperSlide>
      );
    });
  };

  const prefetchNextPage = async () => {
    if (!swiperRef) return;
    if ((swiperRef.activeIndex % swiperRef.slides.length) + 1 === swiperRef.slides.length) {
      await fetchNextPage();
    }
  };

  return Builder.createResult(status)
    .onSuccess(
      <>
        {data && (
          <Swiper
            allowSlidePrev={!isLocked}
            allowSlideNext={!isLocked}
            initialSlide={lastViewedDish.slide}
            direction="vertical"
            onSwiper={setSwiperRef}
            onSlideChange={prefetchNextPage}
            onReachBeginning={() => fetchPreviousPage()}
            onSlideChangeTransitionEnd={updateLastViewedDish}
            slidesPerView={1}
            className={`dishes-list-container ${className}`}>
            {prepareDishesSlides(data.pages)}
            {!hasNextPage && !isFetching ? (
              <SwiperSlide>
                <ErrorDishCard
                  callback={goToFirstSlide}
                  img={LAST_RECIPE_IMAGE}
                  title={LAST_RECIPE_TITLE}
                  caption={LAST_RECIPE_BUTTON}
                />
              </SwiperSlide>
            ) : (
              <SwiperSlide>
                <ErrorDishCard loading />
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </>
    )
    .onError(
      <Box className={`dishes-list-container error ${className}`}>
        <ErrorDishCard
          callback={refetch}
          img={NO_RECIPES_IMAGE}
          title={NO_RECIPES_TITLE}
          caption={NO_RECIPES_BUTTON}
        />
      </Box>
    )
    .build();
};

export default DishesList;
