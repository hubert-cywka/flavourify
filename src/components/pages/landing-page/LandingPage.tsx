import { Box } from '@mui/material';
import './LandingPage.scss';
import DishesList from '../../dishes/dishes-list/DishesList';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';
import { LANDING_PAGE_MOTION } from '../../../constants/MotionKeyConstants';
import { AnimatePresence, motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence>
        <motion.div
          className="landing-page-container"
          key={LANDING_PAGE_MOTION}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <TopNavbar className="top-navbar" />
          <DishesList />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default LandingPage;
