import { User } from '../../types/interfaces/User';
import { USER_DETAILS_QUERY } from '../../constants/QueryConstants';
import { getUserDetails } from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';

export const useUserDetails = () => {
  return useQuery<User>([USER_DETAILS_QUERY], getUserDetails);
};
