import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './DisplayManager.scss';
import React from 'react';

interface DisplayManagerProps {
  className?: string;
  displayParameters: string[];
  // eslint-disable-next-line no-unused-vars
  setDisplayParameters: (params: string[]) => void;
}

const DisplayManager = ({
  displayParameters,
  setDisplayParameters,
  className
}: DisplayManagerProps) => {
  const updateDisplayParameters = (event: React.MouseEvent<HTMLElement>, newParams: string[]) => {
    setDisplayParameters(newParams);
  };

  return (
    <Box className={`display-manager-container ${className}`} sx={{ bgcolor: 'secondary.main' }}>
      <ToggleButtonGroup value={displayParameters} onChange={updateDisplayParameters}>
        <ToggleButton value="shuffle">
          <ShuffleRoundedIcon />
        </ToggleButton>
        <ToggleButton value="favourite">
          <StarRoundedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DisplayManager;
