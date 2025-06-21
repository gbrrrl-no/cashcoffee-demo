import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router';

export default function Dashboard() {
  const { logout, isLogoutPending, user, isAuthenticated, isAuthenticateSuccess } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated && isAuthenticateSuccess) {
    return <Navigate to='/register' />;
  }

  return (
    <section className='flex h-full w-full items-center justify-center overflow-auto p-4'>
      <main className='flex w-full max-w-lg flex-col gap-4 overflow-x-auto rounded-xl bg-white p-4 ring ring-neutral-900/10 dark:bg-neutral-800 dark:ring-neutral-100/15'>
        <section>
          <h1 className='text-lg leading-4 font-semibold'>Dashboard</h1>
          <p className='dark:text-muted text-sm text-neutral-600'>
            {isAuthenticated ? `Bem-vindo, ${user?.name}` : 'Você não está autenticado'}
          </p>
        </section>

        <article className='text-muted-foreground flex min-w-0 flex-col gap-2 text-xs leading-5 *:min-w-3xs'>
          <p>
            Esta é uma aplicação de demonstração. A página de dashboard foi configurada como página
            padrão para que o usuário não precise navegar ao abrir o site, porem, por conta do
            ProtectedRoute que envelopa essa página, o usuário, caso não esteja autenticado, é
            redirecionado automaticamente para a página de login.
          </p>
          <p>
            Ao recarregar a página é possível notar um breve loading, pois o a implementação do
            Protected Route verifica se o usuário está autenticado e, caso não esteja, redireciona
            para a página de login.
          </p>
          <p>
            Existem diferentes abordagens para proteger rotas. Minha abordagem inicial foi a de
            enviar o token usando <CodeHighlight>Set-Cookie</CodeHighlight> com{' '}
            <CodeHighlight>HttpOnly</CodeHighlight> para que ele fosse não acessível pelo client.
            Criei uma rota <CodeHighlight>/auth/me</CodeHighlight> que envia automaticamente o token
            do usuário para o servidor usando a flag <CodeHighlight>withCredentials</CodeHighlight>{' '}
            no axios e recebe a resposta de se aquele token é válido ou não. Caso fosse válido, a
            rota traria os dados do usuário, que seriam armazenados no redux.
          </p>
          <p>
            Entretando, dado que armazenar o token no client é um requisio funcional do projeto,
            precisei refazer o sistema de autenticação para toná-lo acessível.
          </p>
          <p>
            A solução final tem um layout do react-router chamado ProtectedRoute que envelopa todas
            as rotas protegidas, o que é definido em <CodeHighlight>@/routes.ts</CodeHighlight>. O
            ProtectedRoute usa o hook <CodeHighlight>useAuth</CodeHighlight> para puxar a função{' '}
            <CodeHighlight>authenticate()</CodeHighlight> que verifica se o usuário possui um token
            de autenticação. Caso não possua, ele é redirecionado para a página de login. Caso
            possua, a função <CodeHighlight>authenticate()</CodeHighlight> puxa os dados do usuário
            do servidor e armazena no redux.
          </p>
        </article>

        <div className='mt-2 flex flex-col gap-2 *:text-xs'>
          <Button asChild variant='secondary' className='w-full text-xs'>
            <Link to='/readme'>
              <span>Leia o README</span>
            </Link>
          </Button>
          <Button onClick={handleLogout} disabled={isLogoutPending} variant='destructive'>
            Sair
          </Button>
        </div>
      </main>
    </section>
  );
}

const CodeHighlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className='rounded-xs bg-indigo-500/10 px-0.5 text-indigo-500 ring-1 ring-indigo-500/20 dark:bg-indigo-500/20 dark:ring-indigo-500/40'>
      {children}
    </code>
  );
};
