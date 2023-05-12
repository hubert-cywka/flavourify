import { useMutation } from '@tanstack/react-query';
import { changeMyPassword } from '../../../services/UserService';

export const useChangePassword = (currentPassword: string, newPassword: string) => {
  return useMutation([], () => changeMyPassword(currentPassword, newPassword));
};
