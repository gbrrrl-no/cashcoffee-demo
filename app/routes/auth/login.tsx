import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { loginSchema, useLogin } from '../../queries/auth';

export default function Login() {
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending, isSuccess, isError, error } = useLogin(); // TODO: Add UI feedback for the mutation
  const {
    register,
    handleSubmit,
    formState: { errors }, // TODO: Add UI error indicators on the form fields
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async data => {
    loginMutation(data, {
      onSuccess: () => {
        navigate('/');
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
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' {...register('email', { required: true })} />
        </div>
        <div>
          <label htmlFor='password'>Senha:</label>
          <input type='password' id='password' {...register('password', { required: true })} />
        </div>
        <button type='submit'>Entrar</button>
      </form>
      <div className='flex items-center justify-center gap-1 text-xs'>
        Ainda não possui uma conta?
        <Link to='/'>Cadastrar-se</Link>
      </div>
    </>
  );
}
