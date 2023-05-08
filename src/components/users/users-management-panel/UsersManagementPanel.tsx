import { Box, Typography } from '@mui/material';
import UserDetailsRow from '../user-details-row/UserDetailsRow';
import { User } from '../../../types/interfaces/User';
import './UsersManagementPanel.scss';
import {
  USER_EDIT_INFO,
  USER_EDIT_WARNING,
  USERS_NOT_FOUND_ERROR,
  USERS_NOT_FOUND_IMAGE
} from '../../../constants/UserConstants';
import Builder from '../../../utility/Builder';
import { useUsers } from '../../../utility/hooks/useUsers';

interface UsersManagementPanelProps {
  className?: string;
}

const UsersManagementPanel = ({ className }: UsersManagementPanelProps) => {
  const { data, status } = useUsers();

  const buildUserDetailsRows = () => {
    return Builder.createResult(status)
      .onError(
        <Box>
          <img className="users-not-found-image" src={USERS_NOT_FOUND_IMAGE} />
          <Typography sx={{ color: 'accent.error' }} className="users-not-found-text">
            {USERS_NOT_FOUND_ERROR}
          </Typography>
        </Box>
      )
      .onSuccess(
        <>
          {!!data &&
            data.map((user: User, id) => {
              return <UserDetailsRow className="user-details-row" user={user} key={id} />;
            })}
        </>
      )
      .build();
  };

  return (
    <Box className={`users-management-panel ${className} `}>
      <Typography className="users-management-warning">{USER_EDIT_WARNING}</Typography>
      <Typography className="users-management-info">{USER_EDIT_INFO}</Typography>
      {buildUserDetailsRows()}
    </Box>
  );
};

export default UsersManagementPanel;
