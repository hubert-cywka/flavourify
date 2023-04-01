import { Box, Button, Input, Typography } from '@mui/material';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { useState } from 'react';
import {
  SIGN_IN_IMAGE,
  SIGN_UP_UNEXPECTED_ERROR,
  USER_NOT_FOUND
} from '../../../../constants/AuthConstants';
import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../../services/AuthService';
import { AxiosError } from 'axios/index';
import appRouter from '../../../router/AppRouter';
import ROUTE from '../../../router/RoutingConstants';

interface SignInSlideProps {
  slideToSignUp: () => void;
}
const SignInSlide = ({ slideToSignUp }: SignInSlideProps) => {
  const [signInError, setSignInError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync: signIn, status } = useMutation(
    ['SIGN_IN_QUERY_KEY'],
    () => signInUser({ email: email, password: password }),
    {
      onError: (err: AxiosError) => {
        console.log(err);
        if (err?.response?.status === 401) {
          setSignInError(USER_NOT_FOUND);
        } else {
          setSignInError(SIGN_UP_UNEXPECTED_ERROR);
        }
      },
      onSuccess: () => appRouter.navigate(ROUTE.LANDING)
    }
  );

  return (
    <Box className="sign-in-slide">
      <img src={SIGN_IN_IMAGE} className="sign-in-image" />
      <Box>
        <Typography className="authentication-panel-header">Hello again!</Typography>
        <Typography className="authentication-panel-caption">
          Welcome back, you have been missed!
        </Typography>
      </Box>
      <Box>
        <Input
          startAdornment={
            <AlternateEmailRoundedIcon
              className="authentication-input-icon"
              sx={{ color: signInError ? 'accent.error' : 'accent.main' }}
            />
          }
          disableUnderline
          onChange={(event) => setEmail(event.target.value.trim())}
          placeholder="E-mail"
          className="authentication-input"
        />
        <Input
          startAdornment={
            <KeyRoundedIcon
              className="authentication-input-icon"
              sx={{ color: signInError ? 'accent.error' : 'accent.main' }}
            />
          }
          onChange={(event) => setPassword(event.target.value.trim())}
          disableUnderline
          type="password"
          placeholder="Password"
          className="authentication-input"
        />
      </Box>
      <Button
        disabled={status === 'loading'}
        variant={signInError ? 'errorContained' : 'successContained'}
        className="authentication-button"
        onClick={signInError ? () => setSignInError('') : () => signIn()}>
        {signInError ? signInError : status === 'loading' ? 'Entering...' : 'Enter'}
      </Button>
      <Typography
        sx={{ color: 'accent.success' }}
        className="authentication-panel-redirect"
        onClick={slideToSignUp}>
        I want to create new account.
      </Typography>
    </Box>
  );
};

export default SignInSlide;
