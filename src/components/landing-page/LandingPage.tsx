import { Box } from '@mui/material';
import './LandingPage.scss';
import DishesList, { EXAMPLE_DISH } from '../dishes/dishes-list/DishesList';
import DisplayManager from './display-manager/DisplayManager';

const LandingPage = () => {
  return (
    <Box className='landing-page-container' sx={{
      bgcolor: 'primary.main',
      color: 'text.primary'
    }}>
      <DisplayManager className='display-manager' />
      <DishesList dishes={EXAMPLE_DISH} /></Box>);
};

export default LandingPage;
