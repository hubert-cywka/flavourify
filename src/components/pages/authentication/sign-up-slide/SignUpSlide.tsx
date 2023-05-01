import { Box, Button, ClickAwayListener, Input, Typography } from '@mui/material';
import { useState } from 'react';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { createUser } from '../../../../services/UserService';
import { AxiosError } from 'axios';
import StatusScreen from '../../../status-screen/StatusScreen';
import { useMutation } from '@tanstack/react-query';
import {
  EMAIL_ALREADY_EXISTS,
  EMAIL_REQUIREMENTS,
  NICKNAME_REQUIREMENTS,
  PASSWORD_REQUIREMENTS,
  REPEAT_PASSWORD_REQUIREMENTS,
  SIGN_UP_IMAGE,
  SIGN_UP_SUCCESS,
  SIGN_UP_SUCCESS_IMAGE,
  SIGN_UP_UNEXPECTED_ERROR,
  SIGN_UP_REQUIREMENTS_MET,
  SIGN_UP_INITIAL_INFO,
  REDIRECT_TO_SIGN_IN
} from '../../../../constants/AuthConstants';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getConfirmPasswordValidationSchema,
  getEmailValidationSchema,
  getNicknameValidationSchema,
  getNewPasswordValidationSchema
} from '../../../../constants/ValidationSchemas';

type SignUpInputs = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignUpSlideProps {
  slideToSignIn: () => void;
}

const SignUpSlide = ({ slideToSignIn }: SignUpSlideProps) => {
  const [signUpError, setSignUpError] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState(SIGN_UP_INITIAL_INFO);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [displayedMessageType, setDisplayedMessageType] = useState<'error' | 'success' | 'info'>(
    'info'
  );

  const signUpValidationSchema = yup.object({
    nickname: getNicknameValidationSchema(),
    email: getEmailValidationSchema(),
    password: getNewPasswordValidationSchema(),
    confirmPassword: getConfirmPasswordValidationSchema('password')
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm<SignUpInputs>({ mode: 'onBlur', resolver: yupResolver(signUpValidationSchema) });

  const { mutateAsync: createNewUser, status } = useMutation(['SIGN_UP_QUERY_KEY'], () =>
    createUser({
      username: getValues('nickname'),
      email: getValues('email'),
      password: getValues('password')
    })
  );

  const signUp = async () => {
    if (signUpError) {
      setSignUpError('');
      return;
    }

    await createNewUser()
      .then(() => setHasSignedUp(true))
      .catch((err: AxiosError) => {
        if (err?.response?.status === 409) {
          setSignUpError(EMAIL_ALREADY_EXISTS);
        } else {
          setSignUpError(SIGN_UP_UNEXPECTED_ERROR);
        }
      });
  };

  const clearDisplayedInfoIfPossible = () => {
    if (isValid) {
      setDisplayedMessageType('success');
      setDisplayedMessage(SIGN_UP_REQUIREMENTS_MET);
    }
  };

  const setError = (error: string) => {
    setDisplayedMessageType('error');
    setDisplayedMessage(error);
  };

  const setInfo = (info: string) => {
    setDisplayedMessageType('info');
    setDisplayedMessage(info);
  };

  const displayEmailInfo = () => {
    if (errors?.email?.message) setError(errors?.email?.message);
    else setInfo(EMAIL_REQUIREMENTS);
  };

  const displayNicknameInfo = () => {
    if (errors?.nickname?.message) setError(errors.nickname.message);
    else setInfo(NICKNAME_REQUIREMENTS);
  };

  const displayPasswordInfo = () => {
    if (errors?.password?.message) setError(errors.password.message);
    else setInfo(PASSWORD_REQUIREMENTS);
  };

  const displayRepeatedPasswordInfo = () => {
    if (errors?.confirmPassword?.message) setError(errors.confirmPassword.message);
    else setInfo(REPEAT_PASSWORD_REQUIREMENTS);
  };

  return (
    <Box className="authentication-slide">
      <img src={SIGN_UP_IMAGE} className="sign-up-image" />
      <Box>
        <Typography className="authentication-panel-header">Hi!</Typography>
        <Typography className="authentication-panel-caption">Nice to meet you!</Typography>
      </Box>
      {!!displayedMessage && (
        <Box className={`sign-up-info ${displayedMessageType}`}>{displayedMessage}</Box>
      )}
      <ClickAwayListener onClickAway={clearDisplayedInfoIfPossible}>
        <form autoComplete="off" onSubmit={handleSubmit(signUp)} className="authentication-form">
          <Input
            startAdornment={
              <AccountCircleRoundedIcon
                className="authentication-input-icon"
                sx={{ color: errors.nickname ? 'accent.error' : 'accent.success' }}
              />
            }
            disableUnderline
            onFocus={displayNicknameInfo}
            aria-label="username"
            placeholder="How should we call you?"
            className="authentication-input"
            {...register('nickname')}
          />

          <Input
            startAdornment={
              <AlternateEmailRoundedIcon
                className="authentication-input-icon"
                sx={{ color: errors.email ? 'accent.error' : 'accent.success' }}
              />
            }
            disableUnderline
            onFocus={displayEmailInfo}
            aria-label="email"
            placeholder="Enter your e-mail"
            className="authentication-input"
            {...register('email')}
          />

          <Input
            startAdornment={
              <LockRoundedIcon
                className="authentication-input-icon"
                sx={{ color: errors.password ? 'accent.error' : 'accent.success' }}
              />
            }
            onFocus={displayPasswordInfo}
            type="password"
            aria-label="create password"
            placeholder="Create password"
            disableUnderline
            className="authentication-input"
            {...register('password')}
          />

          <Input
            startAdornment={
              <LockResetRoundedIcon
                className="authentication-input-icon"
                sx={{ color: errors.confirmPassword ? 'accent.error' : 'accent.success' }}
              />
            }
            onFocus={displayRepeatedPasswordInfo}
            type="password"
            aria-label="repeat password"
            placeholder="Repeat password"
            disableUnderline
            className="authentication-input"
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            disabled={status === 'loading'}
            variant={signUpError ? 'errorContained' : 'successContained'}
            className="authentication-button">
            {signUpError ? signUpError : status === 'loading' ? 'Creating account...' : 'Join us'}
          </Button>
        </form>
      </ClickAwayListener>

      <Typography
        sx={{ color: 'accent.success' }}
        className="authentication-panel-redirect"
        onClick={slideToSignIn}>
        {REDIRECT_TO_SIGN_IN}
      </Typography>

      <StatusScreen
        header={'Success!'}
        open={hasSignedUp}
        caption={SIGN_UP_SUCCESS}
        imgSource={SIGN_UP_SUCCESS_IMAGE}
        status={'success'}
        close={() => {
          setHasSignedUp(false);
          slideToSignIn();
        }}
      />
    </Box>
  );
};

export default SignUpSlide;
