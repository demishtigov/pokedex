import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useAuthState, useLogoutMutation } from '@utils/firebase';
import { StoreContext } from './StoreContext';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const authState = useAuthState();
  const logoutMutation = useLogoutMutation();
  const [store, setStore] = useState({
    session: { isLoginIn: false }
  });

  useEffect(() => {
    if (authState.data) {
      setStore((prevStore) => ({
        ...prevStore,
        session: { isLoginIn: true }
      }));
    } else {
      setStore((prevStore) => ({
        ...prevStore,
        session: { isLoginIn: false }
      }));
    }
  }, [authState.data]);

  const handleLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          setStore({ session: { isLoginIn: false } });
          console.log('Logout completed, session reset');
        }
      }
    );
  };

  const value = useMemo(
    () => ({
      store,
      setStore,
      logout: handleLogout
    }),
    [store]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
