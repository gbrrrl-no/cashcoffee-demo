import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import { loginSchema } from '../../../queries/auth';
import { useAuth } from '@/hooks/auth/useAuth';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingDots from '@/components/ui/loading-dots';

export default function Login() {
  const { login, loginStatus } = useAuth();
  const { isLoginPending, isLoginError, loginError } = loginStatus;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async data => {
    login(data);
  };

  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <section>
          <h1 className='text-lg leading-4 font-semibold'>Entrar</h1>
          <small className='dark:text-muted text-neutral-600'>Faça login para continuar</small>
        </section>

        {((errors && Object.keys(errors).length > 0) || isLoginError) && (
          <section className='rounded-sm bg-rose-500/10 p-4 text-xs'>
            <h4 className='mb-1 text-sm font-semibold text-rose-500 dark:text-white'>
              Erro ao efetuar login
            </h4>
            <ul className='list-inside list-disc text-rose-500 dark:text-white'>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key} className='ml-1'>
                  {value?.message}
                </li>
              ))}
              {isLoginError && <li className='ml-1'>{loginError?.message}</li>}
            </ul>
          </section>
        )}

        <section className='flex flex-col gap-2 text-xs *:flex *:flex-col *:gap-1'>
          <div>
            <label htmlFor='email'>Email:</label>
            <Input
              type='email'
              id='email'
              placeholder='Digite seu email'
              aria-invalid={errors.email || loginError ? 'true' : 'false'}
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label htmlFor='password'>Senha:</label>
            <Input
              type='password'
              id='password'
              placeholder='Digite sua senha'
              aria-invalid={errors.password || loginError ? 'true' : 'false'}
              {...register('password', { required: true })}
            />
          </div>
        </section>

        <section className='mt-2 flex flex-col gap-1'>
          <Button type='submit' className='w-full text-xs'>
            {isLoginPending ? <LoadingDots /> : 'Entrar'}
          </Button>
          <div className='flex items-center justify-center gap-1 text-xs'>
            Ainda não possui uma conta?
            <Button asChild variant='link' className='px-0 text-xs text-indigo-500'>
              <Link to='/register' data-testid='register'>
                Cadastrar-se
              </Link>
            </Button>
          </div>
        </section>
      </form>
    </article>
  );
}
