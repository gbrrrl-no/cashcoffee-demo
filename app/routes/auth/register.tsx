import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial');

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'É necessário confirmar a senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export default function Register() {
  // TODO: use SSR
  const {
    register,
    handleSubmit,
    formState: { errors }, // TODO: Add error messages to the form
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async data => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data), // TODO: use FormData
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mb-4 flex flex-col gap-2 text-sm *:flex *:flex-col *:gap-1 [&>div]:rounded-lg [&>div>input]:border [&>div>input]:px-2 [&>div>input]:py-1 [&>div>input]:text-sm'
      >
        <div>
          <label htmlFor='name'>Nome:</label>
          <input type='text' id='name' {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' {...register('email', { required: true })} />
        </div>
        <div>
          <label htmlFor='password'>Senha: !8iAa914</label>
          <input type='password' id='password' {...register('password', { required: true })} />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirme sua senha:</label>
          <input
            type='password'
            id='confirmPassword'
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
