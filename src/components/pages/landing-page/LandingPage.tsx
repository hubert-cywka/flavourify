import { Box } from '@mui/material';
import './LandingPage.scss';
import DishesList from '../../dishes/dishes-list/DishesList';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import Animate from '../../animate/Animate';

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <Animate
        className="landing-page-container"
        isVisible={true}
        animation={simpleOpacityAnimation}>
        <TopNavbar className="top-navbar" />
        <DishesList />
      </Animate>
    </Box>
  );
};

export default LandingPage;
