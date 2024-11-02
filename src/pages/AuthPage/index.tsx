import { useNavigate } from 'react-router-dom';
import { Button, Divider, GoogleButton } from '@common';
import { ROUTES } from '@utils/constants';
import { useStore } from '@utils/contexts';
import { useLogInWithGoogleMutation } from '@utils/firebase';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { useState } from 'react';

import coverImage from '../../assets/img/cover.jpg';

export const AuthPage = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const { mutate: logInWithGoogleMutate } = useLogInWithGoogleMutation({
    options: {
      onSuccess: () => {
        setStore({ session: { isLoginIn: true } });
        navigate(ROUTES.POKEMONS);
      }
    }
  });

  return (
    <section className='flex flex-col justify-center md:flex md:h-screen md:items-center md:justify-center'>
      <div className='flex h-auto w-full flex-col rounded-lg bg-gray-50 shadow-xl dark:bg-slate-600 md:h-2/3 md:w-2/3 md:flex-row'>
        <div className='relative mb-20 h-72 w-full rounded-b-3xl md:mb-0 md:h-full md:rounded-b-none md:rounded-l-lg'>
          <div
            className='absolute right-0 left-0 top-14 mx-auto h-full w-full bg-center bg-no-repeat md:top-36'
            style={{
              backgroundImage: "url('/path/to/logo.png')",
              backgroundSize: '210px 80px'
            }}
          />
          <div
            className='mb-20 h-72 w-full rounded-b-3xl bg-cover bg-center md:mb-0 md:h-full md:rounded-b-none md:rounded-l-lg'
            style={{ backgroundImage: `url(${coverImage})` }}
          />
        </div>

        <div className='flex w-full flex-col items-center justify-center p-6 md:w-[550px]'>
          <div className='flex w-full flex-col items-center justify-center'>
            {!isSignUp && <SignInForm />}
            {isSignUp && <SignUpForm />}
            <Button variant='text' onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'already have account' : 'create new account'}
            </Button>
          </div>

          <div className='w-full text-center'>
            <Divider title='OR' />
            <GoogleButton onClick={() => logInWithGoogleMutate({})}>Login with GOOGLE</GoogleButton>
          </div>
        </div>
      </div>
    </section>
  );
};
