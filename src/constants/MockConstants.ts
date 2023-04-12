import { User } from '../types/interfaces/User';
import { USER_ROLE } from '../types/enums/UserRole';
import { SignUpRequest } from '../types/interfaces/SignUpRequest';
import { SignInRequest } from '../types/interfaces/SignInRequest';
import { SignInResponse } from '../types/interfaces/SignInResponse';

export const MOCK_USER: User = {
  username: 'mock_username',
  email: 'mock_email',
  role: USER_ROLE.USER
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
