import { Link } from 'react-router';

export default function Register() {
  return (
    <>
      <form action='' className='mb-4 text-sm *:flex *:flex-col *:gap-1'>
        <div>
          <label htmlFor='name'>Nome:</label>
          <input type='text' id='name' name='name' />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' />
        </div>
        <div>
          <label htmlFor='password'>Senha:</label>
          <input type='password' id='password' name='password' />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirme sua senha:</label>
          <input type='password' id='confirmPassword' name='confirmPassword' />
        </div>
        <button type='submit'>Cadastrar</button>
      </form>
      <div className='flex items-center justify-center gap-1 text-xs'>
        Já possui uma conta?
        <Link to='/login'>Entrar</Link>
      </div>
    </>
  );
}
