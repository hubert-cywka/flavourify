import { Box, Button, Modal, Typography } from '@mui/material';
import './StatusScreen.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { STATUS_SCREEN_MOTION } from '../../constants/MotionKeyConstants';

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
    <AnimatePresence>
      {open && (
        <Modal sx={{ color: 'text.primary' }} className="status-screen-popup" open={open}>
          <Box>
            <motion.div
              className="status-screen-container"
              key={STATUS_SCREEN_MOTION}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}>
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
                    className="status-screen-button"
                    onClick={secondButtonOnClick}>
                    {secondButtonText}
                  </Button>
                )}
                <Button
                  variant={status === 'success' ? 'successContained' : 'errorContained'}
                  className="status-screen-button"
                  onClick={close}>
                  {buttonText ? buttonText : 'OK'}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default StatusScreen;
