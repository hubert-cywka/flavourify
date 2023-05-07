import { Box, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import UserDetailsRow from '../user-details-row/UserDetailsRow';
import { USERS_QUERY } from '../../../constants/QueryConstants';
import { getUsers } from '../../../services/UserService';
import { User } from '../../../types/interfaces/User';
import './UsersManagementPanel.scss';
import {
  USER_EDIT_INFO,
  USER_EDIT_WARNING,
  USERS_NOT_FOUND_ERROR,
  USERS_NOT_FOUND_IMAGE
} from '../../../constants/UserConstants';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Builder from '../../../utility/Builder';

interface UsersManagementPanelProps {
  className?: string;
}

const UsersManagementPanel = ({ className }: UsersManagementPanelProps) => {
  const { data, status } = useQuery([USERS_QUERY], getUsers);
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
      .onLoading(<>{buildUserDetailsMocks()}</>)
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

  const buildUserDetailsMocks = () => {
    const mocks: ReactJSXElement[] = [];
    for (let mockId = 0; mockId < 5; mockId++) {
      mocks.push(
        <Skeleton
          className="user-details-row"
          variant="rectangular"
          sx={{ height: '60px', width: '100%' }}
        />
      );
    }
    return mocks;
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
