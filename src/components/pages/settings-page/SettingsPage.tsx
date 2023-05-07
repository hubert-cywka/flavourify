import { Box } from '@mui/material';
import './SettingsPage.scss';
import SettingsPanel from './settings-panel/SettingsPanel';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import Animate from '../../animate/Animate';

export const SettingsPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <Animate isVisible={true} className="settings-container" animation={simpleOpacityAnimation}>
        <SettingsPanel className="settings-panel" />
      </Animate>
    </Box>
  );
};

export default SettingsPage;
