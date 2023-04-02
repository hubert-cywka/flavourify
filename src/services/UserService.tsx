import { SignUpRequest } from '../types/interfaces/SignUpRequest';
import { apiClient } from './ApiClient';
import { User } from '../types/interfaces/User';

export const createUser = async (userData: SignUpRequest) => {
  const { data } = await apiClient.post<User>(`/auth/signup`, userData);
  return data;
};
