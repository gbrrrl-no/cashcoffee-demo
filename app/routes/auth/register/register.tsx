import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, useRegister } from '../../../queries/auth';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/features/auth/authSlice';
import LoadingDots from '@/components/ui/loading-dots';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: registerMutation, isPending: isRegisterPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async data => {
    registerMutation(data, {
      onSuccess: () => {
        dispatch(loginSuccess({ user: { email: data.email, name: data.name } }));
        navigate('/');
      },
    });
  };

  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <section>
          <h1 className='text-lg leading-4 font-semibold'>Cadastro</h1>
          <small className='dark:text-muted text-neutral-600'>Crie sua conta para continuar</small>
        </section>

        {errors && Object.keys(errors).length > 0 && (
          <section className='rounded-sm bg-rose-500/10 p-4 text-xs'>
            <h4 className='mb-1 text-sm font-semibold text-rose-500 dark:text-white'>
              Erro ao efetuar cadastro
            </h4>
            <ul className='list-inside list-disc text-rose-500 dark:text-white'>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key} className='ml-1'>
                  {value?.message}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='flex flex-col gap-2 text-xs *:flex *:flex-col *:gap-1'>
          <div>
            <label htmlFor='name'>Nome:</label>
            <Input
              type='text'
              id='name'
              placeholder='Digite seu nome'
              aria-invalid={errors.name ? 'true' : 'false'}
              {...register('name', { required: true })}
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <Input
              type='email'
              id='email'
              placeholder='Digite seu email'
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label htmlFor='password'>Senha:</label>
            <Input
              type='password'
              id='password'
              placeholder='Crie uma senha'
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', { required: true })}
            />
            <small className='mt-1 rounded-sm bg-amber-500/20 p-2 text-xs text-amber-500 ring ring-amber-500/40 dark:bg-amber-500/10 dark:text-amber-500/60 dark:ring-amber-500/20'>
              A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula,
              um número e um caractere especial.
            </small>
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirme sua senha:</label>
            <Input
              type='password'
              id='confirmPassword'
              placeholder='Confirme sua senha'
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              {...register('confirmPassword', { required: true })}
            />
          </div>
        </section>

        <section className='mt-2 flex flex-col gap-3'>
          <Button type='submit' size='default' className='w-full text-xs'>
            {isRegisterPending ? <LoadingDots /> : 'Cadastrar'}
          </Button>
          <div className='flex items-center justify-center gap-1 text-xs text-neutral-600'>
            Já possui uma conta?
            <Button asChild variant='link' size='sm' className='h-auto p-0 text-xs text-indigo-500'>
              <Link to='/login'>Entrar</Link>
            </Button>
          </div>
        </section>
      </form>
    </article>
  );
}
