import { ERROR_403_IMAGE } from './AppConstants';
import { USER_ROLE } from '../types/enums/UserRole';
import { SignInRequest } from '../types/interfaces/SignInRequest';
import { SignInResponse } from '../types/interfaces/SignInResponse';
import { SignUpRequest } from '../types/interfaces/SignUpRequest';
import { User } from '../types/interfaces/User';

export const MOCK_USER: User = {
  username: 'mock_username',
  email: 'mock_email',
  role: USER_ROLE.USER,
  picture: ''
};

export const MOCK_SIGN_UP_REQUEST: SignUpRequest = {
  username: 'mock_username',
  email: 'mock@email.com',
  password: 'mock_password'
};

export const MOCK_SIGN_IN_REQUEST: SignInRequest = {
  email: 'email@email.com',
  password: 'Password321!'
};

export const MOCK_SIGN_IN_RESPONSE: SignInResponse = {
  accessToken: 'mock-token',
  refreshToken: 'mock-refresh-token',
  email: 'mock@email.com',
  roles: USER_ROLE.USER,
  username: 'mock-username'
};

export const MOCK_INPUT_VALUE = 'mock_value';

export const MOCK_CAPTION = 'mock_caption';
export const MOCK_HEADER = 'mock_header';
export const MOCK_IMG_SOURCE = ERROR_403_IMAGE;
