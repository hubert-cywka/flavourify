import { Box, Button, ClickAwayListener, Collapse, IconButton } from '@mui/material';
import { User } from '../../../types/interfaces/User';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import './UserDetailsRow.scss';
import { useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useSnackbar } from 'notistack';
import { USERS_QUERY } from '../../../constants/QueryConstants';
import {
  USER_DELETE_ERROR,
  USER_DELETE_SUCCESS,
  USER_ROLE_CHANGE_ERROR,
  USER_ROLE_CHANGE_SUCCESS
} from '../../../constants/UserConstants';
import { queryClient } from '../../../services/QueryClient';
import { deleteUser, updateUserRole } from '../../../services/UserService';
import { USER_ROLE } from '../../../types/enums/UserRole';

interface UserDetailsRowProps {
  className?: string;
  user: User;
}

const UserDetailsRow = ({ className, user }: UserDetailsRowProps) => {
  const [areButtonsDisplayed, setAreButtonsDisplayed] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const setUserRole = (role: string) => {
    if (user.id !== undefined) {
      updateUserRole(user.id, role)
        .then(() => {
          queryClient.invalidateQueries([USERS_QUERY]);
          enqueueSnackbar(USER_ROLE_CHANGE_SUCCESS, { variant: 'success' });
        })
        .catch(() => enqueueSnackbar(USER_ROLE_CHANGE_ERROR, { variant: 'error' }));
    }
  };

  const removeUser = async () => {
    if (user.id !== undefined) {
      deleteUser(user.id)
        .then(() => {
          queryClient.invalidateQueries([USERS_QUERY]);
          enqueueSnackbar(USER_DELETE_SUCCESS, { variant: 'success' });
          setAreButtonsDisplayed(false);
        })
        .catch(() => enqueueSnackbar(USER_DELETE_ERROR, { variant: 'error' }));
    }
  };

  const getManagementPanel = () => {
    return (
      <Collapse
        className="user-manage-row"
        key={user.email}
        unmountOnExit={true}
        mountOnEnter={true}
        in={areButtonsDisplayed}>
        <ClickAwayListener onClickAway={() => setAreButtonsDisplayed(false)}>
          <Box>
            <Button
              onClick={removeUser}
              className="action-button"
              variant="errorContained"
              endIcon={<DeleteForeverRoundedIcon />}>
              Delete user
            </Button>
            {user.role === USER_ROLE.ADMIN ? (
              <Button
                onClick={() => setUserRole(USER_ROLE.USER)}
                className="action-button"
                variant="accentContained">
                Demote to user
              </Button>
            ) : (
              <Button
                onClick={() => setUserRole(USER_ROLE.ADMIN)}
                className="action-button"
                variant="accentContained">
                Promote to admin
              </Button>
            )}
          </Box>
        </ClickAwayListener>
      </Collapse>
    );
  };

  return (
    <Box className={`user-details-row-container ${className}`}>
      <Box className="user-details-row-content">
        {user.role === USER_ROLE.ADMIN ? (
          <Box className="user-role" sx={{ color: 'accent.success' }}>
            <AdminPanelSettingsRoundedIcon />
            Admin
          </Box>
        ) : (
          <Box className="user-role" sx={{ color: 'accent.main' }}>
            <AccountCircleRoundedIcon />
            User
          </Box>
        )}
        <Box className="user-info">
          <Box className="user-username">{user.username}</Box>
          <Box className="user-email">{user.email}</Box>
        </Box>
        <IconButton
          sx={{ color: 'text.primary' }}
          className="expand-management-options-button"
          onClick={() => setAreButtonsDisplayed((prev) => !prev)}>
          {areButtonsDisplayed ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
        </IconButton>
      </Box>
      {getManagementPanel()}
    </Box>
  );
};

export default UserDetailsRow;
