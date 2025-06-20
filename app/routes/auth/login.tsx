import { Link } from 'react-router';

export default function Login() {
  return (
    <>
      <form action='' className='mb-4 text-sm *:flex *:flex-col *:gap-1'>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' />
        </div>
        <div>
          <label htmlFor='password'>Senha:</label>
          <input type='password' id='password' name='password' />
        </div>
        <button type='submit'>Entrar</button>
      </form>
      <div className='flex items-center justify-center gap-1 text-xs'>
        Ainda não possui uma conta?
        <Link to='/register'>Cadastrar-se</Link>
      </div>
    </>
  );
}
