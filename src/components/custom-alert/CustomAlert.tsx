import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack';
import { Box, IconButton } from '@mui/material';
import { HighlightOffRounded } from '@mui/icons-material';
import React from 'react';
import './CustomAlert.scss';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
interface CustomAlertProps extends CustomContentProps {
  variant: 'success' | 'info' | 'error' | 'warning';
}

const CustomAlert = React.forwardRef<HTMLDivElement, CustomAlertProps>((props, ref) => {
  const { id, message, variant } = props;
  const { closeSnackbar } = useSnackbar();

  const dismissSnackbar = () => {
    return (
      <IconButton sx={{ color: '#ffffff' }} onClick={() => closeSnackbar(id)}>
        <HighlightOffRounded />
      </IconButton>
    );
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <TaskAltRoundedIcon />;
      case 'error':
        return <GppBadRoundedIcon />;
      case 'info':
        return <InfoRoundedIcon />;
      case 'warning':
        return <GppMaybeRoundedIcon />;
    }
  };

  return (
    <SnackbarContent className="custom-alert-container" ref={ref} role="alert">
      <Box className="custom-alert">
        <Box className={`alert-content ${variant}`}>
          <Box className="alert-icon">{getIcon()}</Box>
          <Box className="alert-text">{message}</Box>
        </Box>
        <Box className="alert-buttons">{dismissSnackbar()}</Box>
      </Box>
    </SnackbarContent>
  );
});

CustomAlert.displayName = 'CustomAlert';
export default CustomAlert;
