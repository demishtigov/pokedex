import { useMutation } from '@tanstack/react-query';
import { logout } from '../requests';
import { useAuthState } from './useAuthState';

export const useLogoutMutation = () => {
  const authState = useAuthState();

  return useMutation(['logout'], logout, {
    onSuccess: () => {
      authState.data = null; // Принудительный сброс
      console.log('User logged out successfully');
    },
    onError: (error) => {
      console.error('Error logging out:', error);
    }
  });
};
