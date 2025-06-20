import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, useRegister } from '../../queries/auth';

export default function Register() {
  const navigate = useNavigate();

  const { mutate: registerMutation, isPending, isSuccess, isError, error } = useRegister(); // TODO: Add UI feedback for the mutation
  const {
    register,
    handleSubmit,
    formState: { errors }, // TODO: Add UI error indicators on the form fields
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async data => {
    registerMutation(data, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: () => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mb-4 flex flex-col gap-2 text-sm *:flex *:flex-col *:gap-1 [&>div]:rounded-lg [&>div>input]:border [&>div>input]:px-2 [&>div>input]:py-1 [&>div>input]:text-sm'
      >
        <div>
          <label htmlFor='name'>Nome:</label>
          <input
            type='text'
            id='name'
            defaultValue='Lucas Nóbrega'
            {...register('name', { required: true })}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            defaultValue='lucas@gmail.com'
            {...register('email', { required: true })}
          />
        </div>
        <div>
          <label htmlFor='password'>Senha:</label>
          <input
            type='password'
            id='password'
            defaultValue='!8iAa914'
            {...register('password', { required: true })}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirme sua senha:</label>
          <input
            type='password'
            id='confirmPassword'
            defaultValue='!8iAa914'
            {...register('confirmPassword', { required: true })}
          />
        </div>
        <button
          type='submit'
          className='flex h-8 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 text-xs text-white transition-colors duration-200 hover:bg-blue-500/90'
        >
          Cadastrar
        </button>
      </form>
      <div className='flex items-center justify-center gap-1 text-xs'>
        Já possui uma conta?
        <Link to='/login'>Entrar</Link>
      </div>
    </>
  );
}
