import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './DisplayManager.scss';
import React from 'react';
import DisplayedTag from '../../displayed-tag/DisplayedTag';

interface DisplayManagerProps {
  className?: string;
  displayParameters: string[];
  // eslint-disable-next-line no-unused-vars
  setDisplayParameters: (params: string[]) => void;
}

export namespace DISPLAY_PARAMS {
  export const SHUFFLE = 'shuffle';
  export const FAVOURITE = 'favourite';
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
      <DisplayedTag className="selected-tag" />
      <ToggleButtonGroup value={displayParameters} onChange={updateDisplayParameters}>
        <ToggleButton value={DISPLAY_PARAMS.SHUFFLE}>
          <ShuffleRoundedIcon />
        </ToggleButton>
        <ToggleButton value={DISPLAY_PARAMS.FAVOURITE}>
          <StarRoundedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DisplayManager;
