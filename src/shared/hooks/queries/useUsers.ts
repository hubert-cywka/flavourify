import { useQuery } from '@tanstack/react-query';
import { USERS_QUERY } from 'shared/constants/QueryConstants';
import { getUsers } from 'services/UserService';

export const useUsers = () => {
  return useQuery([USERS_QUERY], getUsers);
};
