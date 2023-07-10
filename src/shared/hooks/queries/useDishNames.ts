import { useQuery } from '@tanstack/react-query';
import { getListOfDishesByName } from 'services/DishService';
import { DISHES_NAMES_QUERY } from 'shared/constants/QueryConstants';

export const useDishNames = (textFilter?: string) => {
  return useQuery([DISHES_NAMES_QUERY, { name: textFilter }], () =>
    getListOfDishesByName(textFilter ?? '')
  );
};
