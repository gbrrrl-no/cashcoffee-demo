import { useAuth } from '@/hooks/auth/useAuth';
import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { logout, isLogoutPending, user, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <section className='flex h-full w-full items-center justify-center overflow-auto p-4'>
        <main className='flex w-full max-w-lg flex-col gap-2 overflow-x-auto rounded-xl bg-white p-4 ring ring-neutral-900/10'>
          <section>
            <h1 className='text-lg leading-4 font-semibold'>Dashboard</h1>
            <p className='text-sm text-neutral-600'>
              {isAuthenticated ? `Bem-vindo, ${user?.name}` : 'Você não está autenticado'}
            </p>
          </section>

          <article className='flex min-w-0 flex-col gap-2 text-xs leading-5 text-neutral-600 *:min-w-3xs'>
            <p>
              Esta é uma aplicação de demonstração. A página de dashboard foi configurada como
              página padrão para que o usuário não precise navegar ao abrir o site, porem, por conta
              do ProtectedRoute que envelopa essa página, o usuário, caso não esteja autenticado, é
              redirecionado automaticamente para a página de login.
            </p>
            <p>
              Ao recarregar a página é possível notar um breve loading, pois o ProtectedRoute
              verifica se o usuário está autenticado utilizando uma rota própria para isso e, caso
              não esteja, redireciona para a página de login. Esse loading utiliza a Suspense API do
              React e faz o tratamento de erro através da Error Boundary do projeto para o caso de
              qualquer erro <CodeHighlight>401</CodeHighlight>.
            </p>
            <p>
              Existem diferentes abordagens para proteger rotas. Uma abordagem que eu poderia ter
              utilizado seria usar alguma biblioteca para fazer com que os dados do redux fossem
              persistentes no localStorage. Assim eu poderia checar o token do usuário para
              verificar se ele ainda é válido e, caso não seja, redirecionar para a página de login.
              Entretando essa abordagem requeriria que o token fosse acessível pelo Javascritp do
              client, o que não é uma boa prática. Nas minhas rotas mockadas com o MSW eu enviei o
              token usando <CodeHighlight>'set-cookie'</CodeHighlight> para que o token fosse
              acessível pelo client. Dessa forma, a maneira que eu achei mais adequada para o
              projeto foi a de criar uma rota <CodeHighlight>/auth/me</CodeHighlight> que envia
              automaticamente o token do usuário para o servidor usando a flag{' '}
              <CodeHighlight>withCredentials</CodeHighlight> no axios e recebe a resposta de se
              aquele token é válido ou não. Caso seja válido, a rota trás os dados do usuário, que
              são armazenados no redux.
            </p>
          </article>

          <Button
            onClick={handleLogout}
            disabled={isLogoutPending}
            variant='destructive'
            className='mt-4 w-full text-xs'
          >
            Sair
          </Button>
        </main>
      </section>
    </ProtectedRoute>
  );
}

const CodeHighlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className='rounded-xs bg-indigo-500/10 px-0.5 text-indigo-500 ring-1 ring-indigo-500/20'>
      {children}
    </code>
  );
};
