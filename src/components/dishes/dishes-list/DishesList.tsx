import './DishesList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperRef, { Virtual } from 'swiper';
import 'swiper/scss';
import { useQuery } from '@tanstack/react-query';
import { getDishesPage } from '../../../services/DishService';
import QueryResultsBuilder from '../../../utility/Builder';
import { Box } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
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
import { DISPLAY_PARAMS } from '../../landing-page/display-manager/DisplayManager';
import { shuffleArray } from '../../../utility/shuffleArray';
import { Dish } from '../../../interfaces/Dish';
import { selectedTagContext } from '../../../contexts/SelectedTagContext';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { pushUnique } from '../../../utility/pushUnique';

interface DishesListProps {
  className?: string;
  displayParameters: string[];
}

const DishesList = ({ className, displayParameters }: DishesListProps) => {
  const { selectedTag } = useContext(selectedTagContext);
  const [displayedDishes, setDisplayedDishes] = useState<Dish[]>([]);
  const [isFrontSide, setFrontSide] = useState(true);
  const [page, setPage] = useState(0);

  const { data, status, isPreviousData } = useQuery(
    [DISHES_QUERY, selectedTag.id, page],
    () => getDishesPage(selectedTag.id, page),
    {
      keepPreviousData: true,
      onSuccess: (res) => {
        setDisplayedDishes((current) => pushUnique(current, res.dishes));
      }
    }
  );
  const [swiperRef, setSwiperRef] = useState<SwiperRef | null>(null);

  const flipCard = useCallback(() => {
    setFrontSide((prevState) => !prevState);
  }, []);

  const reloadDishRecipes = () => {
    queryClient.invalidateQueries([DISHES_QUERY, selectedTag.id, page]);
  };

  const goToFirstSlide = () => {
    setPage(0);
    if (swiperRef) swiperRef.slideTo(0);
  };

  const prepareDishesList = (dishesList: Dish[]) => {
    if (displayParameters.includes(DISPLAY_PARAMS.SHUFFLE)) {
      return shuffleArray(dishesList);
    } else {
      return dishesList.slice();
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

  const appendNextPage = () => {
    if (!isPreviousData && data?.hasNext && data.currentPage < data.totalPages) {
      queryClient
        .prefetchQuery(['DISHES_QUERY', selectedTag.id, page + 1], () =>
          getDishesPage(selectedTag.id, page + 1)
        )
        .then(() => setPage(Math.min(data.currentPage + 1, data.totalPages)));
    }
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
            onReachEnd={appendNextPage}
            slidesPerView={1}
            direction="vertical"
            virtual={{ enabled: true, cache: false, addSlidesAfter: 1, addSlidesBefore: 1 }}
            className={`dishes-list-container ${className}`}>
            {buildDishCards(prepareDishesList(displayedDishes))}
            {!data.hasNext && (
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
