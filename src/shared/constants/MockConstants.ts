import { ERROR_403_IMAGE } from './AppConstants';
import { SignUpRequest, SignInResponse, SignInRequest } from 'shared/types/Auth';
import { UserDetails, USER_ROLE } from 'shared/types/User.d';

export const MOCK_USER: UserDetails = {
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
