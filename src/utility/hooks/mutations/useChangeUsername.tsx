import { useMutation } from '@tanstack/react-query';
import { changeMyUsername } from '../../../services/UserService';

export const useChangeUsername = (username: string) => {
  return useMutation([], () => changeMyUsername(username));
};
