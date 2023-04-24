import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LogoutRounded, SettingsRounded, TagRounded } from '@mui/icons-material';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../../../../contexts/ColorModeContext';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import './SettingsPanel.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import SettingsPanelItem from './settings-panel-item/SettingsPanelItem';
import TagsManagementPanel from '../../../tags/tags-management-panel/TagsManagementPanel';
import { hasAdminPermission, signOutUser } from '../../../../services/AuthService';
import UsersManagementPanel from '../../../users/users-management-panel/UsersManagementPanel';

interface SettingsPanelProps {
  className?: string;
}

const SettingsPanel = ({ className }: SettingsPanelProps) => {
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

  return (
    <List
      className={`settings-panel-container ${className}`}
      sx={{ bgcolor: 'background.paper', color: 'text.secondary' }}>
      <ListItem className="settings-panel-header">
        <ListItemIcon>
          {displayedSetting ? (
            <WestRoundedIcon sx={{ cursor: 'pointer' }} onClick={goBackToSettings} />
          ) : (
            <SettingsRounded />
          )}
        </ListItemIcon>
        <ListItemText disableTypography>{displayedSettingName}</ListItemText>
      </ListItem>

      {displayedSetting ? (
        <Box className="displayed-setting">{displayedSetting}</Box>
      ) : (
        <>
          {hasAdminPermission() && (
            <>
              <SettingsPanelItem
                icon={<TagRounded className="icon" />}
                text="Manage tags"
                className="settings-panel-item"
                callback={displayTagsManagementPanel}
              />

              <SettingsPanelItem
                icon={<PeopleRoundedIcon className="icon" />}
                text="Manage users"
                className="settings-panel-item"
                callback={displayUsersManagementPanel}
              />
            </>
          )}

          <SettingsPanelItem
            icon={<Brightness4RoundedIcon className="icon" />}
            text="Toggle color mode"
            className="settings-panel-item"
            callback={toggleColorMode}
            inPlace
          />

          <SettingsPanelItem
            icon={<LogoutRounded className="icon" />}
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
