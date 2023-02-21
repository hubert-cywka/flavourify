import './DishesList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperRef, { Virtual } from 'swiper';
import 'swiper/scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DishesPage, getDishesPage } from '../../../services/DishService';
import QueryResultsBuilder from '../../../utility/Builder';
import { Box } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import DishCard from '../dish-card/DishCard';
import ErrorDishCard from '../dish-card/error-dish-card/ErrorDishCard';
import { queryClient } from '../../../services/QueryClient';
import { DISHES_QUERY } from '../../../constants/QueryConstants';
import { DISPLAY_PARAMS } from '../../landing-page/display-manager/DisplayManager';
import { shuffleArray } from '../../../utility/shuffleArray';
import { Dish } from '../../../interfaces/Dish';
import { selectedTagContext } from '../../../contexts/SelectedTagContext';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
  LAST_RECIPE_BUTTON,
  LAST_RECIPE_IMAGE,
  LAST_RECIPE_TITLE,
  NO_RECIPES_BUTTON,
  NO_RECIPES_IMAGE,
  NO_RECIPES_TITLE
} from '../../../constants/DishesConstants';

interface DishesListProps {
  className?: string;
  displayParameters: string[];
}

const DishesList = ({ className, displayParameters }: DishesListProps) => {
  const { selectedTag } = useContext(selectedTagContext);
  const [isFrontSide, setFrontSide] = useState(true);

  const { data, fetchNextPage, hasNextPage, fetchPreviousPage, isFetching, status } =
    useInfiniteQuery(
      [DISHES_QUERY, { tag: selectedTag.id }],
      ({ pageParam = 0 }) => getDishesPage(selectedTag.id, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.hasNext) return lastPage.currentPage + 1;
          else return undefined;
        },
        getPreviousPageParam: (lastPage) => {
          if (lastPage.hasPrevious) return lastPage.currentPage - 1;
          else return undefined;
        }
      }
    );
  const [swiperRef, setSwiperRef] = useState<SwiperRef | null>(null);

  const flipCard = useCallback(() => {
    setFrontSide((prevState) => !prevState);
  }, []);

  const reloadDishRecipes = () => {
    queryClient.invalidateQueries([DISHES_QUERY, { tag: selectedTag.id }]);
  };

  const goToFirstSlide = () => {
    if (swiperRef) swiperRef.slideTo(0);
  };

  const prepareDishesList = (dishPages: DishesPage[]) => {
    const extractedDishes: Dish[] = [];
    dishPages.forEach((page) => {
      extractedDishes.push(...page.dishes);
    });
    if (displayParameters.includes(DISPLAY_PARAMS.SHUFFLE)) {
      return shuffleArray(extractedDishes.slice());
    } else {
      return extractedDishes.slice();
    }
  };

  const buildDishCards = (dishes: Dish[]): ReactJSXElement[] => {
    return dishes.map((dish) => {
      return (
        <SwiperSlide key={dish.id} virtualIndex={dish.id}>
          <DishCard dish={dish} flipCallback={flipCard} isFrontSide={isFrontSide} />
        </SwiperSlide>
      );
    });
  };

  return QueryResultsBuilder.createResult(status)
    .onSuccess(
      <>
        {data && (
          <Swiper
            modules={[Virtual]}
            allowSlidePrev={isFrontSide}
            allowSlideNext={isFrontSide}
            onSwiper={setSwiperRef}
            onReachEnd={() => fetchNextPage()}
            onReachBeginning={() => fetchPreviousPage()}
            slidesPerView={1}
            direction="vertical"
            virtual={{ enabled: true, cache: false, addSlidesAfter: 1, addSlidesBefore: 1 }}
            className={`dishes-list-container ${className}`}>
            {buildDishCards(prepareDishesList(data.pages))}
            {!hasNextPage && !isFetching && (
              <SwiperSlide>
                <ErrorDishCard
                  callback={goToFirstSlide}
                  img={LAST_RECIPE_IMAGE}
                  title={LAST_RECIPE_TITLE}
                  caption={LAST_RECIPE_BUTTON}
                />
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </>
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
