import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, useRegister } from '../../queries/auth';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/features/auth/authSlice';
import LoadingDots from '@/components/ui/loading-dots';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: registerMutation, isPending, error } = useRegister(); // TODO: Add UI feedback for the mutation
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
        dispatch(loginSuccess({ user: { email: data.email, name: data.name } }));
        navigate('/');
      },
      onError: () => {
        console.error(error);
      },
    });
  };
  console.log(errors);

  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <section>
          <h1 className='text-lg leading-4 font-semibold'>Cadastro</h1>
          <small className='text-neutral-600'>Crie sua conta para continuar</small>
        </section>

        {errors && Object.keys(errors).length > 0 && (
          <section className='rounded-sm bg-red-500/10 p-4 text-xs'>
            <h4 className='mb-1 text-sm font-semibold text-red-600'>Erro ao efetuar cadastro</h4>
            <ul className='list-inside list-disc text-red-500'>
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
              defaultValue='Lucas Nóbrega'
              aria-invalid={errors.name ? 'true' : 'false'}
              {...register('name', { required: true })}
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <Input
              type='email'
              id='email'
              defaultValue='lucas@gmail.com'
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label htmlFor='password'>Senha:</label>
            <Input
              type='password'
              id='password'
              defaultValue='!8iAa914'
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', { required: true })}
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirme sua senha:</label>
            <Input
              type='password'
              id='confirmPassword'
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              defaultValue='!8iAa914'
              {...register('confirmPassword', { required: true })}
            />
          </div>
        </section>

        <section className='mt-2 flex flex-col gap-1'>
          <Button type='submit' size='default' className='w-full text-xs'>
            {isPending ? <LoadingDots /> : 'Cadastrar'}
          </Button>
          <div className='flex items-center justify-center gap-1 text-xs text-neutral-600'>
            Já possui uma conta?
            <Button asChild variant='link' className='px-0 text-xs text-indigo-500'>
              <Link to='/login'>Entrar</Link>
            </Button>
          </div>
        </section>
      </form>
    </article>
  );
}
