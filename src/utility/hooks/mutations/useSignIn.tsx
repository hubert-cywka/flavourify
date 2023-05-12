import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../services/AuthService';

export const useSignIn = (email: string, password: string) => {
  return useMutation(['SIGN_IN_QUERY_KEY'], () => signInUser({ email: email, password: password }));
};
