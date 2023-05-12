import { Box, Tab } from '@mui/material';
import PasswordChangeForm from './password-change-form/PasswordChangeForm';
import './ProfileEditPanel.scss';
import UsernameChangeForm from './username-change-form/UsernameChangeForm';
import { NICKNAME_REQUIREMENTS, PASSWORD_REQUIREMENTS } from '../../../constants/AuthConstants';
import UserInfo from '../user-info/UserInfo';
import TabList from '@mui/lab/TabList';
import { TabContext, TabPanel } from '@mui/lab';
import { SyntheticEvent, useState } from 'react';

interface EditProfilePanelProps {
  className?: string;
}

const ProfileEditPanel = ({ className }: EditProfilePanelProps) => {
  const [visibleTab, setVisibleTab] = useState('1');

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setVisibleTab(newValue);
  };

  return (
    <Box className={`profile-edit-panel ${className}`}>
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
