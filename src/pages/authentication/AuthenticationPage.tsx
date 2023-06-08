import { Box, Slide } from '@mui/material';
import './AuthenticationPage.scss';
import { useState } from 'react';
import SignInSlide from './sign-in-slide/SignInSlide';
import SignUpSlide from './sign-up-slide/SignUpSlide';

const AuthenticationPage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(true);

  const swapSlide = () => {
    setIsSignInVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
      className="authentication-page-container">
      <Slide in={isSignInVisible} direction="up" appear={false} unmountOnExit mountOnEnter>
        <Box className="sign-in-slide">
          <SignInSlide slideToSignUp={swapSlide} />
        </Box>
      </Slide>

      <Slide in={!isSignInVisible} direction="down" unmountOnExit mountOnEnter>
        <Box className="sign-up-slide">
          <SignUpSlide slideToSignIn={swapSlide} />
        </Box>
      </Slide>
    </Box>
  );
};

export default AuthenticationPage;
