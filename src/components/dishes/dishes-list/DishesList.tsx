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

interface DishesListProps {
  className?: string;
  displayParameters: string[];
}

const DishesList = ({ displayParameters, className }: DishesListProps) => {
  const { data: dishes, status } = useQuery(['DISHES_QUERY'], getDishes);

  const parseDishesList = (dishes: Dish[]) => {
    if (displayParameters.includes('shuffle')) return shuffleArray<Dish>(dishes);
    return dishes;
  };

  return QueryResultsBuilder.createResult(status)
    .onSuccess(
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        className={`dishes-list-container ${className}`}>
        {dishes &&
          parseDishesList(dishes).map((dish, id) => {
            return (
              <SwiperSlide key={id}>
                <DishCard className="dish-card" dish={dish} />
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
