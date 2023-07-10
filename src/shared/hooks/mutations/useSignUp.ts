import { useMutation } from '@tanstack/react-query';
import { createUser } from 'services/UserService';

export const useSignUp = (username: string, email: string, password: string) => {
  return useMutation(['SIGN_UP_QUERY_KEY'], () =>
    createUser({
      username,
      email,
      password
    })
  );
};
