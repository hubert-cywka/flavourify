import { Box } from '@mui/material';
import './LandingPage.scss';
import DishesList from '../dishes/dishes-list/DishesList';
import DisplayManager from './display-manager/DisplayManager';
import { useState } from 'react';

const LandingPage = () => {
  const [params, setParams] = useState<string[]>([]);

  return (
    <Box className='landing-page-container' sx={{
      bgcolor: 'primary.main',
      color: 'text.primary'
    }}>
      <DisplayManager className='display-manager' params={params} setParams={setParams} />
      <DishesList params={params} /></Box>);
};

export default LandingPage;
