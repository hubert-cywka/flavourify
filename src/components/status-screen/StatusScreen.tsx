import { Box, Button, Grow, Modal, Typography } from '@mui/material';
import './StatusScreen.scss';

interface StatusScreenProps {
  header: string;
  caption: string;
  open: boolean;
  close: () => void;
  imgSource: string;
  status: 'success' | 'error';
  buttonText?: string;
  secondButtonText?: string;
  secondButtonOnClick?: () => void;
}

const StatusScreen = ({
  header,
  caption,
  imgSource,
  status,
  secondButtonText,
  buttonText,
  secondButtonOnClick,
  close,
  open
}: StatusScreenProps) => {
  return (
    <Modal sx={{ color: 'text.primary' }} className="status-screen-popup" open={open}>
      <Box>
        <Grow
          in={open}
          className="status-screen-container"
          unmountOnExit={true}
          mountOnEnter={true}>
          <Box>
            <img className="status-screen-image" src={imgSource} />
            <Typography
              className="status-screen-header"
              sx={{ color: status === 'success' ? 'accent.success' : 'accent.error' }}>
              {header}
            </Typography>
            <Typography className="status-screen-info">{caption}</Typography>
            <Box className="status-screen-buttons">
              {secondButtonOnClick && (
                <Button
                  variant={'accentContained'}
                  className="status-screen-secondary-button"
                  onClick={secondButtonOnClick}>
                  {secondButtonText}
                </Button>
              )}
              <Button
                variant={status === 'success' ? 'successContained' : 'errorContained'}
                className="status-screen-primary-button"
                onClick={close}>
                {buttonText ? buttonText : 'OK'}
              </Button>
            </Box>
          </Box>
        </Grow>
      </Box>
    </Modal>
  );
};

export default StatusScreen;
