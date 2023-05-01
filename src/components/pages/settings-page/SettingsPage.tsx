import { Box } from '@mui/material';
import './SettingsPage.scss';
import SettingsPanel from './settings-panel/SettingsPanel';
import { SETTINGS_PAGE_MOTION } from '../../../constants/MotionKeyConstants';
import { AnimatePresence, motion } from 'framer-motion';
export const SettingsPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence>
        <motion.div
          className="settings-container"
          key={SETTINGS_PAGE_MOTION}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <SettingsPanel className="settings-panel" />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default SettingsPage;
