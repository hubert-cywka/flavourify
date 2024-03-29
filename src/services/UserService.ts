import { apiClient } from './ApiClient';
import { UserDetails } from 'shared/types/User';
import { SignUpRequest } from 'shared/types/Auth';

export const createUser = async (userData: SignUpRequest) => {
  const { data } = await apiClient.post<UserDetails>(`/auth/signup`, userData);
  return data;
};

export const getUsers = async () => {
  const { data } = await apiClient.get<UserDetails[]>('/users');
  return data;
};

export const deleteUser = async (userId: number) => {
  await apiClient.delete(`/users/${userId}`);
};

export const updateUserRole = async (userId: number, role: string) => {
  const { data } = await apiClient.patch(`/users/${userId}`, role);
  return data;
};

export const changeMyPassword = async (currentPassword: string, newPassword: string) => {
  const { data } = await apiClient.put(`/users/me/password`, {
    currentPassword: currentPassword,
    newPassword: newPassword
  });
  return data;
};

export const changeMyUsername = async (newUsername: string) => {
  const { data } = await apiClient.put(`/users/me/username`, { newUsername: newUsername });
  return data;
};

export const changeMyProfilePicture = async (newPicture: string) => {
  const { data } = await apiClient.put(`/users/me/picture`, { newPicture: newPicture });
  return data;
};

export const getUserDetails = async () => {
  const { data } = await apiClient.get<UserDetails>(`/users/me`);
  return data;
};
