import { DISHES_NAMES_QUERY } from '../../../constants/QueryConstants';
import { getListOfDishesByName } from '../../../services/DishService';
import { useQuery } from '@tanstack/react-query';

export const useDishNames = (textFilter?: string) => {
  return useQuery([DISHES_NAMES_QUERY, { name: textFilter }], () =>
    getListOfDishesByName(textFilter ?? '')
  );
};
