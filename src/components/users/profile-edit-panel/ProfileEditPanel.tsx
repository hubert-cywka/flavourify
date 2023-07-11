import { Box, Tab } from '@mui/material';
import './ProfileEditPanel.scss';
import PasswordChangeForm from 'components/users/profile-edit-panel/password-change-form/PasswordChangeForm';
import UsernameChangeForm from 'components/users/profile-edit-panel/username-change-form/UsernameChangeForm';
import { NICKNAME_REQUIREMENTS, PASSWORD_REQUIREMENTS } from 'shared/constants/AuthConstants';
import UserInfo from 'components/users/user-info/UserInfo';
import TabList from '@mui/lab/TabList';
import { TabContext, TabPanel } from '@mui/lab';
import { ComponentProps, SyntheticEvent, useState } from 'react';
import classNames from 'classnames';

const ProfileEditPanel = ({ className }: ComponentProps<'div'>) => {
  const [visibleTab, setVisibleTab] = useState('1');

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setVisibleTab(newValue);
  };

  return (
    <Box className={classNames('profile-edit-panel', className)}>
      <UserInfo editableProfilePicture />

      <TabContext value={visibleTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} centered>
            <Tab
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Username"
              value="1"
            />
            <Tab
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Password"
              value="2"
            />
          </TabList>
        </Box>

        <TabPanel value="1" className="profile-panel-form-container">
          <Box className="profile-panel-divider">Change username</Box>
          <Box className="profile-panel-requirements">{NICKNAME_REQUIREMENTS} </Box>
          <UsernameChangeForm className="profile-panel-form" />
        </TabPanel>

        <TabPanel value="2" className="profile-panel-form-container">
          <Box className="profile-panel-divider">Change password</Box>
          <Box className="profile-panel-requirements">{PASSWORD_REQUIREMENTS} </Box>
          <PasswordChangeForm className="profile-panel-form" />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileEditPanel;
