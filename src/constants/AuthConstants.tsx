import {
  NICKNAME_MAXIMUM_LENGTH,
  NICKNAME_MINIMUM_LENGTH,
  PASSWORD_MINIMUM_LENGTH
} from './NumberConstants';

export const NICKNAME_REQUIREMENTS = `Nickname should be at least ${NICKNAME_MINIMUM_LENGTH} characters long, up to ${NICKNAME_MAXIMUM_LENGTH} characters.`;
export const EMAIL_REQUIREMENTS = 'Enter a valid email.';
export const PASSWORD_REQUIREMENTS = `Password should be at least ${PASSWORD_MINIMUM_LENGTH} characters long.`;
export const REPEAT_PASSWORD_REQUIREMENTS = 'Enter your password once again.';
export const NICKNAME_TOO_SHORT = `Nickname is too short. ${NICKNAME_REQUIREMENTS}`;
export const NICKNAME_TOO_LONG = `Nickname is too long. ${NICKNAME_REQUIREMENTS}`;
export const WRONG_EMAIL = `That email address is invalid.`;
export const WRONG_PASSWORD = `Password doesn't meet requirements. It should be at least ${PASSWORD_MINIMUM_LENGTH} characters long.`;
export const PASSWORDS_NOT_MATCHING = 'Passwords does not match!';
export const SIGN_UP_SUCCESS = 'You can now sign in.';
export const INVALID_SIGN_UP_DATA = 'Please enter valid data';
export const EMAIL_ALREADY_EXISTS = 'User with this email already exists';
export const USER_NOT_FOUND = 'User with these credentials does not exist';
export const SIGN_UP_UNEXPECTED_ERROR = 'Unexpected error. Try again later.';
export const SIGN_UP_REQUIREMENTS_MET = 'Seems fine!';
export const SIGN_UP_INITIAL_INFO = 'Please fill registration form.';

export const SIGN_IN_IMAGE = '/sign-in.svg';
export const SIGN_UP_IMAGE = '/sign-up.svg';
export const SIGN_UP_SUCCESS_IMAGE = '/sign-up-success.svg';
