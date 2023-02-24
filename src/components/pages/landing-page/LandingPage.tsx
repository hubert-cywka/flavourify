import { Box } from '@mui/material';
import './LandingPage.scss';
import DishesList from '../../dishes/dishes-list/DishesList';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';

const LandingPage = () => {
  return (
    <Box
      className="landing-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <TopNavbar className="top-navbar" />
      <DishesList />
    </Box>
  );
};

export default LandingPage;
