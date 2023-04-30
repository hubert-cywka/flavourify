import { Box, Button, Input, Typography } from '@mui/material';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { useState } from 'react';
import {
  REDIRECT_TO_SIGN_UP,
  SIGN_IN_IMAGE,
  SIGN_UP_UNEXPECTED_ERROR,
  USER_NOT_FOUND
} from '../../../../constants/AuthConstants';
import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../../services/AuthService';
import { AxiosError } from 'axios';
import appRouter from '../../../router/AppRouter';
import ROUTE from '../../../router/RoutingConstants';
import { useForm } from 'react-hook-form';

type SignInInputs = {
  email: string;
  password: string;
};

interface SignInSlideProps {
  slideToSignUp: () => void;
}

const SignInSlide = ({ slideToSignUp }: SignInSlideProps) => {
  const [signInError, setSignInError] = useState('');
  const { register, handleSubmit, getValues } = useForm<SignInInputs>();
  const { mutateAsync: signIn, status } = useMutation(['SIGN_IN_QUERY_KEY'], () =>
    signInUser({ email: getValues('email'), password: getValues('password') })
  );

  const handleSignIn = () => {
    if (signInError) {
      setSignInError('');
      return;
    }

    signIn()
      .then(() => appRouter.navigate(ROUTE.LANDING))
      .catch((err: AxiosError) => {
        if (err?.response?.status === 401) {
          setSignInError(USER_NOT_FOUND);
        } else {
          setSignInError(SIGN_UP_UNEXPECTED_ERROR);
        }
      });
  };

  return (
    <Box className="authentication-slide">
      <img src={SIGN_IN_IMAGE} className="sign-in-image" />
      <Box>
        <Typography className="authentication-panel-header">Hello again!</Typography>
        <Typography className="authentication-panel-caption">You have been missed!</Typography>
      </Box>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
        className="authentication-form">
        <Input
          {...register('email')}
          startAdornment={
            <AlternateEmailRoundedIcon
              className="authentication-input-icon"
              sx={{ color: signInError ? 'accent.error' : 'accent.main' }}
            />
          }
          aria-label="email"
          disableUnderline
          placeholder="E-mail"
          className="authentication-input"
        />

        <Input
          {...register('password')}
          startAdornment={
            <KeyRoundedIcon
              className="authentication-input-icon"
              sx={{ color: signInError ? 'accent.error' : 'accent.main' }}
            />
          }
          aria-label="password"
          disableUnderline
          type="password"
          placeholder="Password"
          className="authentication-input"
        />

        <Button
          type="submit"
          disabled={status === 'loading'}
          variant={signInError ? 'errorContained' : 'successContained'}
          className="authentication-button">
          {signInError ? signInError : status === 'loading' ? 'Entering...' : 'Enter'}
        </Button>
      </form>
      <Typography
        sx={{ color: 'accent.success' }}
        className="authentication-panel-redirect"
        onClick={slideToSignUp}>
        {REDIRECT_TO_SIGN_UP}
      </Typography>
    </Box>
  );
};

export default SignInSlide;
