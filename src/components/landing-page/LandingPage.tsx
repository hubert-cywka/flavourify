import { Box } from '@mui/material';
import './LandingPage.scss';
import DishesList from '../dishes/dishes-list/DishesList';
import DisplayManager from './display-manager/DisplayManager';
import { useState } from 'react';

const LandingPage = () => {
  const [displayParameters, setDisplayParameters] = useState<string[]>([]);

  return (
    <Box
      className="landing-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <DisplayManager
        className="display-manager"
        displayParameters={displayParameters}
        setDisplayParameters={setDisplayParameters}
      />
      <DishesList displayParameters={displayParameters} />
    </Box>
  );
};

export default LandingPage;
