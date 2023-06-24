import { Box, Skeleton } from '@mui/material';
import Builder from 'utility/Builder';
import './UserInfo.scss';
import UserProfilePicture from 'components/users/user-info/user-profile-picture/UserProfilePicture';
import { useUserDetails } from 'utility/hooks/queries/useUserDetails';

interface UserInfoProps {
  className?: string;
  editableProfilePicture?: boolean;
}

const UserInfo = ({ className, editableProfilePicture }: UserInfoProps) => {
  const { data, status } = useUserDetails();

  return (
    <Box className={`user-info ${className}`}>
      {Builder.createResult(status)
        .onSuccess(
          <>
            {data && (
              <>
                <UserProfilePicture
                  src={data.picture}
                  fallbackText={data.username.charAt(0)}
                  editable={!!editableProfilePicture}
                  className="user-info-picture"
                />
                <Box className="user-info-username">{data.username}</Box>
                <Box className="user-info-email">{data.email}</Box>
              </>
            )}
          </>
        )
        .onLoading(
          <>
            <Skeleton className="user-info-picture" variant="circular" />
            <Skeleton className="user-info-username" width={100} />
            <Skeleton className="user-info-email" width={150} />
          </>
        )
        .onError(
          <>
            <UserProfilePicture src="" fallbackText="!" className="user-info-picture" />
            <Box className="user-info-username">Ooops!</Box>
            <Box className="user-info-email">{`Couldn't fetch user details.`}</Box>
          </>
        )
        .build()}
    </Box>
  );
};

export default UserInfo;
