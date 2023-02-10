import DishCard from '../dish-card/DishCard';
import './DishesList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { getDishes } from '../../../services/DishService';
import { shuffleArray } from '../../../utility/shuffleArray';
import QueryResultsBuilder from '../../../utility/Builder';
import { Box, Typography } from '@mui/material';
import { Dish } from '../../../interfaces/Dish';
import { useState } from 'react';
import DishDetails from '../dish-details/DishDetails';
import ReactCardFlip from 'react-card-flip';
import { DISPLAY_PARAMS } from '../../landing-page/display-manager/DisplayManager';

interface DishesListProps {
  className?: string;
  displayParameters: string[];
}

const DishesList = ({ displayParameters, className }: DishesListProps) => {
  const { data: dishes, status } = useQuery(['DISHES_QUERY'], getDishes);
  const [isFrontSide, swapSide] = useState(true);

  const flipCard = () => {
    swapSide((prevState) => !prevState);
  };

  const parseDishesList = (dishes: Dish[]) => {
    if (displayParameters.includes(DISPLAY_PARAMS.SHUFFLE)) return shuffleArray<Dish>(dishes);
    return dishes;
  };

  return QueryResultsBuilder.createResult(status)
    .onSuccess(
      <Swiper
        allowSlideNext={isFrontSide}
        allowSlidePrev={isFrontSide}
        direction="vertical"
        slidesPerView="auto"
        className={`dishes-list-container ${className}`}>
        {dishes &&
          parseDishesList(dishes).map((dish, id) => {
            return (
              <SwiperSlide key={id}>
                <ReactCardFlip isFlipped={!isFrontSide}>
                  <DishCard flipCallback={flipCard} className="dish-card" dish={dish} />
                  <DishDetails flipCallback={flipCard} className="dish-card" dish={dish} />
                </ReactCardFlip>
              </SwiperSlide>
            );
          })}
      </Swiper>
    )
    .onError(
      <Box className={`dishes-list-container error ${className}`}>
        <img className="error-image" src="./recipe-book.svg" />
        <Typography variant="h6">Could not find any recipes</Typography>
        <Typography variant="subtitle1">Try again later</Typography>{' '}
      </Box>
    )
    .build();
};

export default DishesList;
