import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MenuBookRounded, SettingsRounded, TagRounded } from '@mui/icons-material';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../../../../contexts/ColorModeContext';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import './SettingsPanel.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import SettingsPanelItem from './settings-panel-item/SettingsPanelItem';
import TagsManagementPanel from '../../../tags/tags-management-panel/TagsManagementPanel';
import DishCardAdd from '../../../dishes/dish-card/other-variants/dish-card-add/DishCardAdd';

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

  const displayDishAddPanel = () => {
    setDisplayedSetting(<DishCardAdd className="dish-card-add" onClose={goBackToSettings} />);
    setDisplayedSettingName('Add new dish');
  };

  const displayTagsManagementPanel = () => {
    setDisplayedSetting(<TagsManagementPanel className="tags-management-panel" />);
    setDisplayedSettingName('Manage tags');
  };

  return (
    <List
      className={`settings-panel-container ${className}`}
      sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <ListItem className="settings-panel-header">
        <ListItemIcon>
          {displayedSetting ? <WestRoundedIcon onClick={goBackToSettings} /> : <SettingsRounded />}
        </ListItemIcon>
        <ListItemText disableTypography>{displayedSettingName}</ListItemText>
      </ListItem>

      {displayedSetting ? (
        <Box className="displayed-setting">{displayedSetting}</Box>
      ) : (
        <>
          <SettingsPanelItem
            icon={<Brightness4RoundedIcon className="icon" />}
            text="Toggle color mode"
            className="settings-panel-item"
            callback={toggleColorMode}
            inPlace
          />

          <SettingsPanelItem
            icon={<MenuBookRounded className="icon" />}
            text="Add new dish"
            className="settings-panel-item"
            callback={displayDishAddPanel}
          />

          <SettingsPanelItem
            icon={<TagRounded className="icon" />}
            text="Manage tags"
            className="settings-panel-item"
            callback={displayTagsManagementPanel}
          />
        </>
      )}
    </List>
  );
};

export default SettingsPanel;
