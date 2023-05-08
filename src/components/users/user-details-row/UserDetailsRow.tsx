import { Box, Button, ClickAwayListener, IconButton } from '@mui/material';
import { User } from '../../../types/interfaces/User';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { USER_ROLE } from '../../../types/enums/UserRole';
import './UserDetailsRow.scss';
import { useState } from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { USERS_QUERY } from '../../../constants/QueryConstants';
import { deleteUser, updateUserRole } from '../../../services/UserService';
import { queryClient } from '../../../services/QueryClient';
import { useSnackbar } from 'notistack';
import {
  USER_DELETE_ERROR,
  USER_DELETE_SUCCESS,
  USER_ROLE_CHANGE_ERROR,
  USER_ROLE_CHANGE_SUCCESS
} from '../../../constants/UserConstants';
import { expandCollapseAnimation } from '../../../constants/AnimationConfigs';
import AnimatePresence from '../../animate-presence/AnimatePresence';

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

  return (
    <ClickAwayListener onClickAway={() => setAreButtonsDisplayed(false)}>
      <>
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

          <AnimatePresence
            isVisible={areButtonsDisplayed}
            className="user-manage-row"
            key={user.email}
            animation={expandCollapseAnimation}>
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
          </AnimatePresence>
        </Box>
      </>
    </ClickAwayListener>
  );
};

export default UserDetailsRow;
