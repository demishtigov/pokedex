import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@common';
import { citySchema, emailSchema, nameSchema, passwordSchema, ROUTES } from '@utils/constants';
import { useStore } from '@utils/contexts';
import { useRegisterWithEmailAndPasswordMutation } from '@utils/firebase';
import { FC } from 'react';

interface SignUpFormValues extends User {
  email: string;
  password: string;
}

export const SignUpForm: FC = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError } = useForm<SignUpFormValues>();
  const registerWithEmailAndPasswordMutation = useRegisterWithEmailAndPasswordMutation({
    options: {
      onSuccess: () => {
        setStore({ session: { isLoginIn: true } });
        navigate(ROUTES.POKEMONS);
      },
      onError: (error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError(
            'email',
            { type: 'custom', message: 'email already in use' },
            { shouldFocus: true }
          );
        }
      }
    }
  });

  const { isSubmitting, errors } = formState;
  const loading = isSubmitting || registerWithEmailAndPasswordMutation.isLoading;

  return (
    <form
      className='mt-6 flex w-full flex-col gap-3'
      onSubmit={handleSubmit(({ password, ...user }) =>
        registerWithEmailAndPasswordMutation.mutate({ user, password })
      )}
    >
      <h1 className='mb-4 text-3xl font-semibold'>Sign up</h1>
      <Input
        {...register('displayName', nameSchema)}
        disabled={loading}
        error={errors.displayName?.message}
        placeholder='name'
      />
      <Input
        {...register('email', emailSchema)}
        disabled={loading}
        error={errors.email?.message}
        placeholder='email'
      />
      <Input
        {...register('city', citySchema)}
        disabled={loading}
        error={errors.city?.message}
        placeholder='city'
      />
      <Input
        type='password'
        {...register('password', passwordSchema)}
        disabled={loading}
        error={errors.password?.message}
        placeholder='password'
      />
      <Button type='submit' variant='contained' loading={loading}>
        OK
      </Button>
    </form>
  );
};
