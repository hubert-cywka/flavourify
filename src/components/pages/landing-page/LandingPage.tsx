import { Box } from '@mui/material';
import './LandingPage.scss';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import AnimatePresence from '../../animate-presence/AnimatePresence';
import DishesList from '../../dishes/dishes-list/DishesList';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence
        className="landing-page-container"
        isVisible={true}
        animation={simpleOpacityAnimation}>
        <TopNavbar className="top-navbar" />
        <DishesList />
      </AnimatePresence>
    </Box>
  );
};

export default LandingPage;
