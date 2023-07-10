import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from 'services/UserService';
import { USER_DETAILS_QUERY } from 'shared/constants/QueryConstants';
import { UserDetails } from 'shared/types/User';

export const useUserDetails = () => {
  return useQuery<UserDetails>([USER_DETAILS_QUERY], getUserDetails);
};
