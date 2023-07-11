import { ComponentProps, useContext, useState } from 'react';
import { LogoutRounded, SettingsRounded, TagRounded } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsPanelItem from 'pages/settings-page/settings-panel/settings-panel-item/SettingsPanelItem';
import { ColorModeContext } from 'shared/contexts/ColorModeContext';
import './SettingsPanel.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { hasAdminPermission, signOutUser } from 'services/AuthService';
import TagsManagementPanel from 'components/tags/tags-management-panel/TagsManagementPanel';
import ProfileEditPanel from 'components/users/profile-edit-panel/ProfileEditPanel';
import UserInfo from 'components/users/user-info/UserInfo';
import UsersManagementPanel from 'components/users/users-management-panel/UsersManagementPanel';
import classNames from 'classnames';

const SettingsPanel = ({ className }: ComponentProps<'div'>) => {
  const [displayedSetting, setDisplayedSetting] = useState<ReactJSXElement | null>(null);
  const [displayedSettingName, setDisplayedSettingName] = useState<string>('Settings');
  const { toggleColorMode } = useContext(ColorModeContext);

  const goBackToSettings = () => {
    setDisplayedSetting(null);
    setDisplayedSettingName('Settings');
  };

  const displayTagsManagementPanel = () => {
    setDisplayedSetting(<TagsManagementPanel className="tags-management-panel" />);
    setDisplayedSettingName('Manage tags');
  };

  const displayUsersManagementPanel = () => {
    setDisplayedSetting(<UsersManagementPanel className="users-management-panel" />);
    setDisplayedSettingName('Manage users');
  };

  const displayProfileEditPanel = () => {
    setDisplayedSetting(<ProfileEditPanel className="profile-edit-panel" />);
    setDisplayedSettingName('Edit profile');
  };

  return (
    <List className={classNames('settings-panel-container', className)}>
      <ListItem className="settings-panel-header">
        <ListItemIcon>
          {displayedSetting ? (
            <WestRoundedIcon
              sx={{ cursor: 'pointer', color: 'accent.main' }}
              onClick={goBackToSettings}
            />
          ) : (
            <SettingsRounded sx={{ color: 'accent.main' }} />
          )}
        </ListItemIcon>
        <ListItemText disableTypography>{displayedSettingName}</ListItemText>
      </ListItem>

      {displayedSetting ? (
        <Box className="displayed-setting">{displayedSetting}</Box>
      ) : (
        <>
          <UserInfo className="user-info-container" />

          <SettingsPanelItem
            icon={<AccountCircleRoundedIcon className="icon" sx={{ color: 'accent.main' }} />}
            text="Edit profile"
            className="settings-panel-item"
            callback={displayProfileEditPanel}
          />

          {hasAdminPermission() && (
            <>
              <SettingsPanelItem
                icon={<TagRounded className="icon" sx={{ color: 'accent.main' }} />}
                text="Manage tags"
                className="settings-panel-item"
                callback={displayTagsManagementPanel}
              />

              <SettingsPanelItem
                icon={<PeopleRoundedIcon className="icon" sx={{ color: 'accent.main' }} />}
                text="Manage users"
                className="settings-panel-item"
                callback={displayUsersManagementPanel}
              />
            </>
          )}

          <SettingsPanelItem
            icon={<Brightness4RoundedIcon className="icon" sx={{ color: 'accent.main' }} />}
            text="Toggle color mode"
            className="settings-panel-item"
            callback={toggleColorMode}
            inPlace
          />

          <SettingsPanelItem
            icon={<LogoutRounded className="icon" sx={{ color: 'accent.main' }} />}
            text="Logout"
            className="settings-panel-item"
            callback={signOutUser}
            inPlace
          />
        </>
      )}
    </List>
  );
};

export default SettingsPanel;
