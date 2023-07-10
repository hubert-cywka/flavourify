import './DishesList.scss';
import { useState } from 'react';
import { Box } from '@mui/material';
import SwiperRef from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  LAST_RECIPE_BUTTON,
  LAST_RECIPE_IMAGE,
  LAST_RECIPE_TITLE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from 'shared/constants/DishesConstants';
import { DishesPage } from 'services/DishService';
import { Dish } from 'shared/types/Dish';
import Builder from 'shared/utility/Builder';
import { useDishes } from 'shared/hooks/queries/useDishes';
import DishCard from 'components/dishes/dish-card/DishCard';
import ErrorDishCard from 'components/dishes/dish-card/other-variants/error-dish-card/ErrorDishCard';

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
            observer
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
