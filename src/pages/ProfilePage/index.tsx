import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@common';
import { ROUTES } from '@utils/constants';
import { INITIAL_STORE, useStore } from '@utils/contexts';
import { useAuthState, useLogoutMutation } from '@utils/firebase';
import { UserInfo } from '@common/profile/useriInfo/UserInfo';
import { TeamSection } from '@common/profile/team/TeamSection';

export const ProfilePage = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();
  const authState = useAuthState();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          setStore(INITIAL_STORE);
          navigate(ROUTES.AUTH);
        }
      }
    );
  };

  if (!authState.data) return <Spinner />;
  const user = authState.data;

  return (
    <div className='page flex flex-col items-center gap-8 lg:mx-auto lg:w-3/4 lg:items-start'>
      <UserInfo user={user} />
      <TeamSection pokemons={user.pokemons} />
      <Button className='md:hidden lg:hidden' onClick={handleLogout}>
        LOGOUT
      </Button>
    </div>
  );
};
