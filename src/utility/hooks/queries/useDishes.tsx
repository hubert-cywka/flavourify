import { useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DISHES_QUERY } from '../../../constants/QueryConstants';
import { lastViewedDishContext } from '../../../contexts/LastViewedDishContext';
import { getDishesPage } from '../../../services/DishService';

export const useDishes = () => {
  const { lastViewedDish, setLastViewedDish } = useContext(lastViewedDishContext);
  return {
    ...useInfiniteQuery(
      [DISHES_QUERY, { tag: lastViewedDish.tag.id }],
      ({ pageParam = 0 }) => getDishesPage(lastViewedDish.tag.id, pageParam),
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
    ),
    lastViewedDish,
    setLastViewedDish
  };
};
