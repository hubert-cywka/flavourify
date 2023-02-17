import { Box, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './DisplayManager.scss';
import React, { useState } from 'react';
import { QueueRounded } from '@mui/icons-material';
import DishCardAddDialog from '../../dishes/dish-card/dish-card-add-dialog/DishCardAddDialog';

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
  const [isDishAddDialogOpen, setIsDishAddDialogOpen] = useState(false);
  const updateDisplayParameters = (event: React.MouseEvent<HTMLElement>, newParams: string[]) => {
    setDisplayParameters(newParams);
  };

  return (
    <>
      <Box className={`display-manager-container ${className}`} sx={{ bgcolor: 'secondary.main' }}>
        <ToggleButtonGroup value={displayParameters} onChange={updateDisplayParameters}>
          <ToggleButton value={DISPLAY_PARAMS.SHUFFLE}>
            <ShuffleRoundedIcon />
          </ToggleButton>
          <ToggleButton value={DISPLAY_PARAMS.FAVOURITE}>
            <StarRoundedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton onClick={() => setIsDishAddDialogOpen(true)} className="action-button">
          <QueueRounded />
          <Typography className="action-button-label">New dish</Typography>
        </IconButton>
      </Box>

      <DishCardAddDialog open={isDishAddDialogOpen} onClose={() => setIsDishAddDialogOpen(false)} />
    </>
  );
};

export default DisplayManager;
