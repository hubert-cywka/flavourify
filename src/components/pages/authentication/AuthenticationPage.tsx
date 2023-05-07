import { Box } from '@mui/material';
import './AuthenticationPage.scss';
import { useState } from 'react';
import SignInSlide from './sign-in-slide/SignInSlide';
import SignUpSlide from './sign-up-slide/SignUpSlide';
import Animate from '../../animate/Animate';
import { slideFromLeft, slideFromRight } from '../../../constants/AnimationConfigs';

const AuthenticationPage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(true);

  const swapSlide = () => {
    setIsSignInVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
      className="authentication-page-container">
      <Animate isVisible={isSignInVisible} animation={slideFromRight} className="sign-in-slide">
        <SignInSlide slideToSignUp={swapSlide} />
      </Animate>

      <Animate isVisible={!isSignInVisible} animation={slideFromLeft} className="sign-up-slide">
        <SignUpSlide slideToSignIn={swapSlide} />
      </Animate>
    </Box>
  );
};

export default AuthenticationPage;
