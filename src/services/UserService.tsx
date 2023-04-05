import { SignUpRequest } from '../types/interfaces/SignUpRequest';
import { apiClient } from './ApiClient';
import { User } from '../types/interfaces/User';

export const createUser = async (userData: SignUpRequest) => {
  const { data } = await apiClient.post<User>(`/auth/signup`, userData);
  return data;
};

export const getUsers = async () => {
  const { data } = await apiClient.get<User[]>('/users');
  return data;
};

export const deleteUser = async (userId: number) => {
  await apiClient.delete(`/users/${userId}`);
};

export const updateUserRole = async (userId: number, role: string) => {
  const { data } = await apiClient.patch(`/users/${userId}`, role);
  return data;
};
