import { Box } from '@mui/material';
import './SettingsPage.scss';
import SettingsPanel from './settings-panel/SettingsPanel';
export const SettingsPage = () => {
  return (
    <>
      <Box
        className="settings-page-container"
        sx={{
          bgcolor: 'primary.main',
          color: 'text.primary'
        }}>
        <SettingsPanel className="settings-panel" />
      </Box>
    </>
  );
};

export default SettingsPage;
