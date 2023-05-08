import { Box } from '@mui/material';
import './SettingsPage.scss';
import SettingsPanel from './settings-panel/SettingsPanel';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import AnimatePresence from '../../animate-presence/AnimatePresence';

export const SettingsPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence
        isVisible={true}
        className="settings-container"
        animation={simpleOpacityAnimation}>
        <SettingsPanel className="settings-panel" />
      </AnimatePresence>
    </Box>
  );
};

export default SettingsPage;
