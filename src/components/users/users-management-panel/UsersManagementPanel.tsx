import { Box, Input, Typography } from '@mui/material';
import { ChangeEvent, useState, KeyboardEvent, useRef, ComponentProps } from 'react';
import UserDetailsRow from '../user-details-row/UserDetailsRow';
import { UserDetails } from 'shared/types/User';
import './UsersManagementPanel.scss';
import {
  NO_USERS_FOUND,
  USER_EDIT_INFO,
  USER_EDIT_WARNING,
  USERS_NOT_FOUND_ERROR,
  USERS_NOT_FOUND_IMAGE
} from 'shared/constants/UserConstants';
import Builder from 'shared/utility/Builder';
import { useUsers } from 'shared/hooks/queries/useUsers';
import { filterUsers } from 'shared/utility/userUtils';
import classNames from 'classnames';

const UsersManagementPanel = ({ className }: ComponentProps<'div'>) => {
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data, status } = useUsers();

  const createFilteredUserRows = () => {
    if (!data) return;

    const userRows = filterUsers(data, filter).map((user: UserDetails, id) => {
      return <UserDetailsRow className="user-details-row" user={user} key={id} />;
    });

    if (userRows.length) {
      return userRows;
    } else {
      return <Box className="user-details-row no-users">{NO_USERS_FOUND}</Box>;
    }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter(e.target.value);
  };

  const blurOnEnter = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <Box className={classNames('users-management-panel', className)}>
      <Typography className="users-management-warning">{USER_EDIT_WARNING}</Typography>
      <Typography className="users-management-info">{USER_EDIT_INFO}</Typography>
      <Input
        inputRef={inputRef}
        defaultValue={filter}
        placeholder="Search for users"
        disableUnderline
        className="filter-input"
        onKeyUp={(e) => blurOnEnter(e)}
        onChange={(e) => updateFilter(e)}
      />
      {Builder.createResult(status)
        .onError(
          <Box>
            <img className="users-not-found-image" src={USERS_NOT_FOUND_IMAGE} />
            <Typography sx={{ color: 'accent.error' }} className="users-not-found-text">
              {USERS_NOT_FOUND_ERROR}
            </Typography>
          </Box>
        )
        .onSuccess(<>{createFilteredUserRows()}</>)
        .build()}
    </Box>
  );
};

export default UsersManagementPanel;
