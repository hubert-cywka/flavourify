import { Box, Button, ClickAwayListener, FormControl, Input, Typography } from '@mui/material';
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
  INVALID_SIGN_UP_DATA,
  NICKNAME_REQUIREMENTS,
  NICKNAME_TOO_LONG,
  NICKNAME_TOO_SHORT,
  PASSWORD_REQUIREMENTS,
  PASSWORDS_NOT_MATCHING,
  REPEAT_PASSWORD_REQUIREMENTS,
  SIGN_UP_IMAGE,
  SIGN_UP_SUCCESS,
  SIGN_UP_SUCCESS_IMAGE,
  SIGN_UP_UNEXPECTED_ERROR,
  WRONG_EMAIL,
  WRONG_PASSWORD,
  SIGN_UP_REQUIREMENTS_MET,
  SIGN_UP_INITIAL_INFO,
  REDIRECT_TO_SIGN_IN
} from '../../../../constants/AuthConstants';
import {
  NICKNAME_MAXIMUM_LENGTH,
  NICKNAME_MINIMUM_LENGTH,
  PASSWORD_MINIMUM_LENGTH
} from '../../../../constants/NumberConstants';

interface SignUpSlideProps {
  slideToSignIn: () => void;
}
const SignUpSlide = ({ slideToSignIn }: SignUpSlideProps) => {
  const [signUpError, setSignUpError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState(SIGN_UP_INITIAL_INFO);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [displayedMessageType, setDisplayedMessageType] = useState<'error' | 'success' | 'info'>(
    'info'
  );
  const { mutateAsync: createNewUser, status } = useMutation(['SIGN_UP_QUERY_KEY'], () =>
    createUser({ username: nickname, email: email, password: password })
  );

  const signUp = async () => {
    if (!isDataCorrect()) {
      setSignUpError(INVALID_SIGN_UP_DATA);
    } else {
      await createNewUser()
        .then(() => setHasSignedUp(true))
        .catch((err: AxiosError) => {
          if (err?.response?.status === 409) {
            setSignUpError(EMAIL_ALREADY_EXISTS);
          } else {
            setSignUpError(SIGN_UP_UNEXPECTED_ERROR);
          }
        });
    }
  };

  const isDataCorrect = () => {
    return (
      !emailError &&
      !passwordError &&
      !nicknameError &&
      !repeatedPasswordError &&
      !!password &&
      !!email &&
      !!nickname
    );
  };

  const clearDisplayedInfoIfPossible = () => {
    if (isDataCorrect()) {
      setDisplayedMessageType('success');
      setDisplayedMessage(SIGN_UP_REQUIREMENTS_MET);
    }
  };

  const validateNickname = () => {
    if (nickname.length > NICKNAME_MAXIMUM_LENGTH) {
      setNicknameError(NICKNAME_TOO_LONG);
    } else if (nickname.length < NICKNAME_MINIMUM_LENGTH) {
      setNicknameError(NICKNAME_TOO_SHORT);
    } else {
      setNicknameError('');
    }
  };

  const validateEmail = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
      setEmailError(WRONG_EMAIL);
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    validateRepeatedPassword();
    if (password.length < PASSWORD_MINIMUM_LENGTH) {
      setPasswordError(WRONG_PASSWORD);
    } else {
      setPasswordError('');
    }
  };

  const validateRepeatedPassword = () => {
    if (repeatedPassword !== password) {
      setRepeatedPasswordError(PASSWORDS_NOT_MATCHING);
    } else {
      setRepeatedPasswordError('');
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
    if (emailError) setError(emailError);
    else setInfo(EMAIL_REQUIREMENTS);
  };

  const displayNicknameInfo = () => {
    if (nicknameError) setError(nicknameError);
    else setInfo(NICKNAME_REQUIREMENTS);
  };

  const displayPasswordInfo = () => {
    if (passwordError) setError(passwordError);
    else setInfo(PASSWORD_REQUIREMENTS);
  };

  const displayRepeatedPasswordInfo = () => {
    if (repeatedPasswordError) setError(repeatedPasswordError);
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
        <Box>
          <FormControl className="authentication-input-row">
            <Input
              startAdornment={
                <AccountCircleRoundedIcon
                  className="authentication-input-icon"
                  sx={{ color: nicknameError ? 'accent.error' : 'accent.success' }}
                />
              }
              disableUnderline
              onChange={(event) => setNickname(event.target.value.trim())}
              onFocus={displayNicknameInfo}
              onBlur={validateNickname}
              aria-label="username"
              placeholder="How should we call you?"
              className="authentication-input"
            />
          </FormControl>
          <FormControl className="authentication-input-row">
            <Input
              startAdornment={
                <AlternateEmailRoundedIcon
                  className="authentication-input-icon"
                  sx={{ color: emailError ? 'accent.error' : 'accent.success' }}
                />
              }
              disableUnderline
              onFocus={displayEmailInfo}
              onChange={(event) => setEmail(event.target.value.trim())}
              onBlur={validateEmail}
              aria-label="email"
              placeholder="Enter your e-mail"
              className="authentication-input"
            />
          </FormControl>
          <FormControl className="authentication-input-row">
            <Input
              startAdornment={
                <LockRoundedIcon
                  className="authentication-input-icon"
                  sx={{ color: passwordError ? 'accent.error' : 'accent.success' }}
                />
              }
              onFocus={displayPasswordInfo}
              onChange={(event) => setPassword(event.target.value.trim())}
              onBlur={validatePassword}
              type="password"
              aria-label="create password"
              placeholder="Create password"
              disableUnderline
              className="authentication-input"
            />
          </FormControl>
          <FormControl className="authentication-input-row">
            <Input
              startAdornment={
                <LockResetRoundedIcon
                  className="authentication-input-icon"
                  sx={{ color: repeatedPasswordError ? 'accent.error' : 'accent.success' }}
                />
              }
              onFocus={displayRepeatedPasswordInfo}
              onChange={(event) => setRepeatedPassword(event.target.value.trim())}
              onBlur={validateRepeatedPassword}
              type="password"
              aria-label="repeat password"
              placeholder="Repeat password"
              disableUnderline
              className="authentication-input"
            />
          </FormControl>
        </Box>
      </ClickAwayListener>
      <Button
        disabled={status === 'loading'}
        variant={signUpError ? 'errorContained' : 'successContained'}
        className="authentication-button"
        onClick={signUpError ? () => setSignUpError('') : signUp}>
        {signUpError ? signUpError : status === 'loading' ? 'Creating account...' : 'Join us'}
      </Button>
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
