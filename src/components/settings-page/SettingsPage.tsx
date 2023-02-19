import { Box } from '@mui/material';
import './SettingsPage.scss';
import ColorModeSettings from './settings/color-mode-settings/ColorModeSettings';
import SettingsPaper from './settings/settings-paper/SettingsPaper';
import { QueueRounded } from '@mui/icons-material';
import DishCardAddDialog from '../dishes/dish-card/dish-card-add-dialog/DishCardAddDialog';
import { useState } from 'react';

export const SettingsPage = () => {
  const [isDishAddDialogOpen, setIsDishAddDialogOpen] = useState(false);

  return (
    <>
      <Box
        className="settings-page-container"
        sx={{
          bgcolor: 'primary.main',
          color: 'text.primary'
        }}>
        <ColorModeSettings className="settings-paper" />
        <SettingsPaper
          className="settings-paper"
          text="Add new dish"
          icon={<QueueRounded />}
          callback={() => setIsDishAddDialogOpen(true)}
        />
      </Box>
      <DishCardAddDialog open={isDishAddDialogOpen} onClose={() => setIsDishAddDialogOpen(false)} />
    </>
  );
};

export default SettingsPage;
