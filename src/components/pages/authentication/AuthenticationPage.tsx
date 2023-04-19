import { Box } from '@mui/material';
import './AuthenticationPage.scss';
import { useState } from 'react';
import SignInSlide from './sign-in-slide/SignInSlide';
import SignUpSlide from './sign-up-slide/SignUpSlide';
import { AnimatePresence, motion } from 'framer-motion';
import { SIGN_IN_SLIDE_MOTION, SIGN_UP_SLIDE_MOTION } from '../../../constants/MotionKeyConstants';

const AuthenticationPage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(true);

  const swapSlide = () => {
    setIsSignInVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
      className="authentication-page-container">
      <AnimatePresence initial={false} mode={'popLayout'}>
        {isSignInVisible && (
          <motion.div
            key={SIGN_IN_SLIDE_MOTION}
            className="sign-in-slide"
            initial={{ translateX: '-100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '-100%' }}
            transition={{ bounce: 0, duration: 0.3 }}>
            <SignInSlide slideToSignUp={swapSlide} />
          </motion.div>
        )}
        {!isSignInVisible && (
          <motion.div
            key={SIGN_UP_SLIDE_MOTION}
            className="sign-up-slide"
            initial={{ translateX: '100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '100%' }}
            transition={{ bounce: 0, duration: 0.3 }}>
            <SignUpSlide slideToSignIn={swapSlide} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AuthenticationPage;
