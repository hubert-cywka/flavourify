import { Box, Button, Modal, Typography } from '@mui/material';
import './StatusScreen.scss';
import { wobblyAppearAnimation } from '../../constants/AnimationConfigs';
import Animate from '../animate/Animate';

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
        <Animate
          isVisible={open}
          animation={wobblyAppearAnimation}
          className="status-screen-container">
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
        </Animate>
      </Box>
    </Modal>
  );
};

export default StatusScreen;
