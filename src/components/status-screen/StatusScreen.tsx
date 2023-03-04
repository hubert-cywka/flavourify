import { Box, Button, Modal, Typography } from '@mui/material';
import './StatusScreen.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { STATUS_SCREEN_MOTION } from '../../constants/MotionKeyConstants';

interface StatusScreenProps {
  header: string;
  info: string;
  open: boolean;
  close: () => void;
  svg: string;
  status: 'success' | 'error';
  buttonText?: string;
  buttonOnClick?: () => void;
}

const StatusScreen = ({
  header,
  info,
  svg,
  status,
  buttonText,
  buttonOnClick,
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
              <img className="status-screen-image" src={svg} />
              <Typography
                className="status-screen-header"
                sx={{ color: status === 'success' ? 'accent.success' : 'accent.error' }}>
                {header}
              </Typography>
              <Typography className="status-screen-info">{info}</Typography>
              <Box className="status-screen-buttons">
                {buttonOnClick && (
                  <Button
                    variant={'accentContained'}
                    className="status-screen-button"
                    onClick={buttonOnClick}>
                    {buttonText}
                  </Button>
                )}
                <Button
                  variant={status === 'success' ? 'successContained' : 'errorContained'}
                  className="status-screen-button"
                  onClick={close}>
                  OK
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
