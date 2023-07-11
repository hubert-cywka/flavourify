import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { HighlightOffRounded } from '@mui/icons-material';
import './Toast.scss';
import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import classNames from 'classnames';

interface ToastProps extends CustomContentProps {
  variant: 'success' | 'info' | 'error' | 'warning';
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const { id, message, variant } = props;
  const { closeSnackbar } = useSnackbar();

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
    <SnackbarContent className="toast-container" ref={ref} role="alert">
      <Box className={classNames('toast', variant)}>
        <Box className="toast-icon">{getIcon()}</Box>
        <Box className="toast-text">{message}</Box>
        <Box className="toast-buttons">
          <IconButton sx={{ color: '#ffffff' }} onClick={() => closeSnackbar(id)}>
            <HighlightOffRounded />
          </IconButton>
        </Box>
      </Box>
    </SnackbarContent>
  );
});

Toast.displayName = 'Toast';
export default Toast;
