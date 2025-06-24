import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function Dashboard() {
  const { logout, logoutStatus, user, isAuthenticated } = useAuth();
  const { isAuthenticatePending } = useSelector((state: RootState) => state.auth);
  const { isLogoutPending } = logoutStatus;

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticatePending) {
    return (
      <section className='flex h-full w-full items-center justify-center p-4'>
        <main className='flex w-full max-w-lg flex-col gap-4 overflow-x-auto rounded-xl bg-white p-4 ring ring-neutral-900/10 dark:bg-neutral-800 dark:ring-neutral-100/15'>
          <section>
            <h1 className='mb-1 text-lg leading-4 font-semibold'>Dashboard</h1>
            <div className='h-4 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
          </section>

          <article className='flex min-w-0 flex-col gap-2' data-testid='dashboard-loading-state'>
            <div className='h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-5/6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
          </article>

          <div className='mt-2 flex flex-col gap-2'>
            <Button variant='secondary' className='w-full text-xs' disabled>
              <div className='h-3 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'></div>
            </Button>
            <Button variant='destructive' disabled>
              <div className='h-3 w-14 animate-pulse rounded bg-neutral-200 dark:bg-neutral-600'></div>
            </Button>
          </div>
        </main>
      </section>
    );
  }

  return (
    <section className='flex h-full w-full items-center justify-center p-4'>
      <main className='flex w-full max-w-lg flex-col gap-4 rounded-xl bg-white p-4 ring ring-neutral-900/10 dark:bg-neutral-800 dark:ring-neutral-100/15'>
        <section>
          <h1 className='text-lg leading-4 font-semibold'>Dashboard</h1>
          <p className='dark:text-muted text-sm text-neutral-600'>
            {isAuthenticated ? `Bem-vindo, ${user?.name}` : 'Você não está autenticado'}
          </p>
        </section>

        <article className='text-muted-foreground flex min-w-0 flex-col gap-2 text-xs leading-5 *:min-w-0'>
          <p>
            Esta é uma aplicação de demonstração. A página de dashboard foi configurada como página
            padrão para que o usuário não precise navegar pela aplicação ou fazer ao abrir o site,
            porem, por conta do ProtectedRoute que envelopa essa página, o usuário, caso não esteja
            autenticado, é redirecionado automaticamente para a página de login.
          </p>
          <p>
            Ao recarregar a página é possível notar um breve loading, pois a implementação do
            Protected Route verifica se o usuário possui um token válido e, caso não possua,
            redireciona para a página de login.
          </p>
          <p>
            Existem diferentes abordagens para proteger rotas. Minha abordagem inicial foi a de
            enviar o token usando <CodeHighlight>Set-Cookie</CodeHighlight> com{' '}
            <CodeHighlight>HttpOnly</CodeHighlight> para que ele fosse não acessível pelo client.
            Criei uma rota <CodeHighlight>/auth/me</CodeHighlight> que envia automaticamente o token
            do usuário para o servidor usando a flag <CodeHighlight>withCredentials</CodeHighlight>{' '}
            no axios e recebe a resposta de se aquele token é válido ou não. Caso seja válido, a
            rota traz os dados do usuário, que são armazenados no redux.
          </p>
          <p>
            Entretanto, dado que armazenar o token no client é um requisito funcional do projeto,
            precisei refazer o sistema de autenticação para torná-lo acessível.
          </p>
          <p>
            A solução final tem um layout do react-router chamado{' '}
            <CodeHighlight>_protected-layout</CodeHighlight> que envelopa todas as rotas protegidas,
            o que é definido em <CodeHighlight>@/routes.ts</CodeHighlight>. O ProtectedRoute usa o
            hook <CodeHighlight>useAuth</CodeHighlight> para puxar a função{' '}
            <CodeHighlight>authenticate()</CodeHighlight> que verifica se o usuário possui um token
            de autenticação. Caso não possua, ele é redirecionado para a página de login. Caso
            possua, a função <CodeHighlight>authenticate()</CodeHighlight> puxa os dados do usuário
            do servidor e armazena no redux.
          </p>
          <p>
            Para ter uma visão completa do projeto, acesse o{' '}
            <CodeHighlight>README.md</CodeHighlight> no GitHub ou clicando no botão abaixo.
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
