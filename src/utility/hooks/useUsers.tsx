import { USERS_QUERY } from '../../constants/QueryConstants';
import { getUsers } from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
  return useQuery([USERS_QUERY], getUsers);
};
