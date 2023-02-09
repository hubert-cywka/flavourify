import DishCard, { Dish } from '../dish-card/DishCard';
import './DishesList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { getDishes } from '../../../services/DishService';

interface DishesListProps {
  className?: string;
  params: string[];
}

const DishesList = ({ params, className }: DishesListProps) => {
  const { data: dishes } = useQuery(['DISHES_QUERY'], getDishes);

  const shuffleArray = (arrayToCopy: Dish[]): Dish[] => {
    let array = arrayToCopy.slice();
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const parseDishesList = () => {
    if (!!dishes && params.includes('shuffle')) return shuffleArray(dishes);
    return dishes;
  };

  return <Swiper direction='vertical' slidesPerView='auto' className={`dishes-list-container ${className}`}>
    {dishes && parseDishesList()?.map((dish, id) => {
      return <SwiperSlide key={id}><DishCard className='dish-card' dish={dish} /></SwiperSlide>;
    })}
  </Swiper>;
};

export default DishesList;
