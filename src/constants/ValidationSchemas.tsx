import * as yup from 'yup';
import {
  CONFIRM_PASSWORD_REQUIRED,
  EMAIL_REQUIRED,
  NICKNAME_REQUIRED,
  NICKNAME_TOO_LONG,
  NICKNAME_TOO_SHORT,
  PASSWORD_REQUIRED,
  PASSWORDS_NOT_MATCHING,
  WRONG_EMAIL,
  WRONG_PASSWORD
} from './AuthConstants';
import {
  NICKNAME_MAXIMUM_LENGTH,
  NICKNAME_MINIMUM_LENGTH,
  PASSWORD_MINIMUM_LENGTH
} from './NumberConstants';

export const getNicknameValidationSchema = () =>
  yup
    .string()
    .required(NICKNAME_REQUIRED)
    .min(NICKNAME_MINIMUM_LENGTH, NICKNAME_TOO_SHORT)
    .max(NICKNAME_MAXIMUM_LENGTH, NICKNAME_TOO_LONG);

export const getEmailValidationSchema = () =>
  yup.string().required(EMAIL_REQUIRED).email(WRONG_EMAIL);

export const getPasswordValidationSchema = () =>
  yup.string().required(PASSWORD_REQUIRED).min(PASSWORD_MINIMUM_LENGTH, WRONG_PASSWORD);

export const getConfirmPasswordValidationSchema = (passwordFieldName: string) =>
  yup
    .string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref(passwordFieldName)], PASSWORDS_NOT_MATCHING);
