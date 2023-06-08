import { Box } from '@mui/material';
import './LandingPage.scss';
import { simpleOpacityAnimation } from '../../constants/AnimationConfigs';
import AnimatePresence from '../../components/animate-presence/AnimatePresence';
import DishesList from '../../components/dishes/dishes-list/DishesList';
import TopNavbar from '../../components/navbars/top-navbar/TopNavbar';
import { useResizeOnUpdate } from '../../utility/hooks/useResizeOnUpdate';

const LandingPage = () => {
  useResizeOnUpdate();

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
