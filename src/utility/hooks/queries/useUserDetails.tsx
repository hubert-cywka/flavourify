import { useQuery } from '@tanstack/react-query';
import { USER_DETAILS_QUERY } from '../../../constants/QueryConstants';
import { getUserDetails } from '../../../services/UserService';
import { User } from '../../../types/interfaces/User';

export const useUserDetails = () => {
  return useQuery<User>([USER_DETAILS_QUERY], getUserDetails);
};
