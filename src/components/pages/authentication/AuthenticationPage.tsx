import { Box } from '@mui/material';
import './AuthenticationPage.scss';
import { useState } from 'react';
import SignInSlide from './sign-in-slide/SignInSlide';
import SignUpSlide from './sign-up-slide/SignUpSlide';
import AnimatePresence from '../../animate-presence/AnimatePresence';
import {
  slideFromLeftAnimation,
  slideFromRightAnimation
} from '../../../constants/AnimationConfigs';

const AuthenticationPage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(true);

  const swapSlide = () => {
    setIsSignInVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
      className="authentication-page-container">
      <AnimatePresence
        isVisible={isSignInVisible}
        animation={slideFromRightAnimation}
        className="sign-in-slide">
        <SignInSlide slideToSignUp={swapSlide} />
      </AnimatePresence>

      <AnimatePresence
        isVisible={!isSignInVisible}
        animation={slideFromLeftAnimation}
        className="sign-up-slide">
        <SignUpSlide slideToSignIn={swapSlide} />
      </AnimatePresence>
    </Box>
  );
};

export default AuthenticationPage;
