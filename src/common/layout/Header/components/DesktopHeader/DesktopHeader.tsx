import { Link, useNavigate } from 'react-router-dom';

import { Button, ThemeButton, Typography } from '@common';
import { ROUTES } from '@utils/constants';
import { INITIAL_STORE, useStore } from '@utils/contexts';
import { useAuthState, useLogoutMutation } from '@utils/firebase';

import styles from './DesktopHeader.module.css';
import { setDefaultImage } from '@utils/helpers';

export const DesktopHeader = () => {
  const { setStore } = useStore();
  const authState = useAuthState();
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

  return (
    <div className={styles.desktop_header_container}>
      <div className={styles.desktop_header}>
        <div className={styles.menu_container}>
          <Typography variant='title'>Pokemon</Typography>
          <nav>
            <ul className={styles.navigation}>
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.POKEMONS}>Pokemons</Link>
                </Typography>
              </li>
              {authState.data?.uid && (
                <>
                  <li>
                    <Typography variant='title-regular'>
                      <Link to={ROUTES.PROFILE}>Profile</Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='title-regular'>
                      <Link to={ROUTES.SETTINGS}>Settings</Link>
                    </Typography>
                  </li>
                </>
              )}
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.USERS}>Users</Link>
                </Typography>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.menu_container}>
          <ThemeButton />
          {authState.data && authState.data.photoURL && (
            <Link to={ROUTES.PROFILE}>
              <img src={authState.data.photoURL} alt='photoURL' onError={setDefaultImage} />
            </Link>
          )}
          <Button
            onClick={() => {
              logoutMutation.mutate(
                {},
                {
                  onSuccess: () => {
                    setStore(INITIAL_STORE);
                    navigate(ROUTES.AUTH); 
                  }
                }
              );
              setStore(INITIAL_STORE);
              navigate(ROUTES.AUTH);
            }}
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};
