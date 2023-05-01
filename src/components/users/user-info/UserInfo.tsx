import { Box, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { USER_DETAILS_QUERY } from '../../../constants/QueryConstants';
import { getUserDetails } from '../../../services/UserService';
import { USER_ROLE } from '../../../types/enums/UserRole';
import Builder from '../../../utility/Builder';
import './UserInfo.scss';
import { User } from '../../../types/interfaces/User';

interface UserInfoProps {
  className?: string;
}

const UserInfo = ({ className }: UserInfoProps) => {
  const { data, status } = useQuery<User>([USER_DETAILS_QUERY], getUserDetails);

  const getProfilePicture = (userDetails: User) => {
    if (userDetails.picture) return userDetails.picture;
    else {
      return userDetails.username.charAt(0);
    }
  };

  const getUserRole = () => {
    switch (data?.role) {
      case USER_ROLE.ADMIN:
        return 'Admin';

      case USER_ROLE.USER: {
        return 'User';
      }
    }
  };

  return (
    <Box className={`user-info ${className}`}>
      {Builder.createResult(status)
        .onSuccess(
          <>
            {data && (
              <>
                <Box className="user-info-picture">{getProfilePicture(data)}</Box>
                <Box className="user-info-username">{data.username}</Box>
                <Box className="user-info-email">{data.email}</Box>
                <Box className="user-info-role">{getUserRole()}</Box>
              </>
            )}
          </>
        )
        .onLoading(
          <>
            <Skeleton className="user-info-picture" variant="circular" />
            <Skeleton className="user-info-username" width={100} />
            <Skeleton className="user-info-email" width={150} />
            <Skeleton className="user-info-role" width={50} />
          </>
        )
        .onError(
          <>
            <Box className="user-info-picture">!</Box>
            <Box className="user-info-username">Ooops!</Box>
            <Box className="user-info-email">{`Couldn't fetch user details.`}</Box>
            <Box className="user-info-role">Please try again later.</Box>
          </>
        )
        .build()}
    </Box>
  );
};

export default UserInfo;
