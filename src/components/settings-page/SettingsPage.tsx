import { Box } from '@mui/material';
import './SettingsPage.scss';
import ColorModeSettings from './settings/color-mode-settings/ColorModeSettings';

export const SettingsPage = () => {
  return (
    <Box
      className="generator-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <ColorModeSettings className="settings-paper" />
    </Box>
  );
};

export default SettingsPage;
