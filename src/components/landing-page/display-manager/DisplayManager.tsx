import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './DisplayManager.scss';
import React from 'react';
import DisplayedTag from '../../tags/displayed-tag/DisplayedTag';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded } from '@mui/icons-material';
import appRouter from '../../router/AppRouter';

interface DisplayManagerProps {
  className?: string;
  displayParameters?: string[];
  setDisplayParameters?: (params: string[]) => void; // eslint-disable-line no-unused-vars
  singleDishVariant?: boolean;
}

export namespace DISPLAY_PARAMS {
  export const SHUFFLE = 'shuffle';
  export const FAVOURITE = 'favourite';
}

const DisplayManager = ({
  displayParameters,
  setDisplayParameters,
  className,
  singleDishVariant
}: DisplayManagerProps) => {
  const updateDisplayParameters = (event: React.MouseEvent<HTMLElement>, newParams: string[]) => {
    if (setDisplayParameters) setDisplayParameters(newParams);
  };

  return (
    <Box
      className={`display-manager-container ${className}`}
      sx={{ bgcolor: 'secondary.main', color: 'text.secondary' }}>
      <SearchBar className="search-bar" />
      {!singleDishVariant ? (
        <>
          <DisplayedTag className="selected-tag" />
          <ToggleButtonGroup value={displayParameters} onChange={updateDisplayParameters}>
            <ToggleButton value={DISPLAY_PARAMS.SHUFFLE}>
              <ShuffleRoundedIcon />
            </ToggleButton>
            <ToggleButton value={DISPLAY_PARAMS.FAVOURITE}>
              <StarRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </>
      ) : (
        <Box className="back-button" onClick={() => appRouter.navigate(-1)}>
          <ArrowBackRounded className="back-button-icon" />
          <Box className="back-button-label">Go back</Box>
        </Box>
      )}
    </Box>
  );
};

export default DisplayManager;
