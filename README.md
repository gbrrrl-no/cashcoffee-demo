# [CashCoffee Demo](https://https://cashcoffee-demo.vercel.app/)

Demo de login e autenticação usando Typescript com react-router (framework) e TailwindCSS. Para fins de facilitar a visualização da demo foi feito um deploy na Vercel. É possível acessar a demo publicada clicando [aqui](https://https://cashcoffee-demo.vercel.app/).

## Tecnologias Utilizadas

- **React Router v7 + Vite** - Framework de roteamento

   Framework poderoso e já configurado

- **Tailwind CSS** - Framework CSS utilitário

   Por questões de familiaridade

- **Redux Toolkit** - Gerenciamento de estado da aplicação

   Para fins de demonstração preferi redux a usar um simples context

- **React Query (TanStack Query)** - Gerenciamento de estado de requisições

   Por questões de familiaridade e porque facilita o tratamento de estados das requests, o que permite deixar a aplicação mais dinâmica e completa

- **React Hook Form + Zod** - Gerenciamento de formulários e validação de esquemas

   Familiaridade e é a melhor maneira validar formulários. Facilita muito a vida quando eu quero mostrar feedbacks pros usuários, o que se aplica nos requisitos da aplicação

- **MSW (Mock Service Worker)** - Mocking de APIs

   Requisito do sistema e, inegavelmente a melhor maneira de simular requests mockadas

- **React Testing Library + Jest** - Testes end-to-end e integração com React

   Requisitos do sistema, porem acredito que existam suites de ferramentas mais apropriadas, dada a stack, como Vitest, que é feito para funcionar com Vite e é a biblioteca recomendada do MSW

## Pré-requisitos

Para rodar o projeto é preciso de:

- **Node.js** (versão 18 ou superior)
- [**pnpm**](https://pnpm.io) (gerenciador de pacotes)

Usar pnpm é opcional, mas foi o gerenciador de pacotes que eu utilizei. É também o formato da lock-file do projeto, então para ter 100% de certeza de que vai funcionar exatamente como na minha máquina é interessante usar dele. Dito isso, deve funcionar com NPM normalmente.

## Instalação e execução

1. **Clone o repositório**
   ```bash
   git clone git@github.com:gbrrrl-no/cashcoffee-demo.git
   cd cashcoffee-demo
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute os testes end-to-end**
   ```bash
   pnpm test PARA ALTERAR
   ```

4. **Inicie em modo de desenvolvimento**
   
   Para iniciar o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

   A aplicação estará disponível em [`http://localhost:5173`](http://localhost:5173)

5. **Teste de credenciamento**
   
   A aplicação possui uma tela de cadastro e uma tela de login. É possível efetuar o cadastro contanto que se passem valores válidos nos campos e e-mail e senha. Ao efetuar um cadastro válido, o usuário é automaticamente logado e enviado para a tela de dashboard em `/`.

   Para fins de demonstração, existe também uma credencial já cadastrada para que se possa testas os diversos feedbacks na UI da tela de login. Para acessá-los utilize o usuário `lucas@gmail.com` e a senha `!8iAa914`.

   OBS: Lucas é o nome do meu irmão <3

## Executar no modo de Produção

Para fazer o build da aplicação:

```bash
pnpm build
```

Para iniciar o servidor de produção:

```bash
pnpm start
```

## Funcionalidades

- **Autenticação** - Sistema de login e registro mockados
- **ProtectedRoute** - Área protegida para usuários autenticados
- **Formulários** - Validação com React Hook Form e Zod
- **Mocking** - APIs mockadas com MSW para desenvolvimento
- **Responsivo** - Interface adaptável com Tailwind CSS
- **Testes Unitários** - Testes end-to-end com Jest e React Testing Library

## Decisões arquiteturais

   PARA ALTERAR


## Resolução do questionário

1. **Explique brevemente a diferença entre componentes funcionais e de classe. Quando você usaria cada um?**

   A utilização de classes para declarar componentes foi a abordagem inicial do React quando o ecossistema ainda estava se desenvolvendo. Neles, os componentes criados instanciariam a classe `React.Component` e gerenciariam o estado usando `this.state` e `this.setState`. A classe possui vários métodos padrões que podem ser implementados pelo desenvolvedor, sendo o principal o método `render()`, que executa todo o código a cada renderização e retorna um fragmento de JSX, que é o que vai ser gerado de fato pelo componente. Existem vários outros métodos que ajudam a gerenciar o que acontece no ciclo de vida componente, como `componentDidMount()` ou `componentDidCatch()` e no geral é possível criar componentes bem completos usando esse método. Entretanto essa forma de criar componentes é mais comum em códigos legado e o método preferencial para se escrever React hoje em dia é usando function components. Eles no geral são mais simples e bem mais legíveis. São funções que retornam JSX e gerenciam estado usando react hooks, que são o grande "super poder" dos componentes funcionais. Praticamente todas os métodos de gerenciamento de ciclo de vida que existiam nos react class components possuem alternativas usando hooks e é possível até mesmo criar hooks personalizados, que podem misturar lógica própria com acesso a hooks do react e até de outras bibliotecas, como tanstack-query ou redux. No geral eu sempre utilizaria functional components para projetos novos ou que já tenham esse padrão e utilizaria class components para projetos legado que tenham sido escritos dessa maneira, mas sempre mantendo em mente uma possível refatoração. Existem poucas vantagens de usar class components. A única que eu me lembro é que é possível passar um callback como segundo parâmetro para `this.setState` e executar um bloco de código de maneira síncrona após a alteração de estado, mas algo similar pode ser alcançado usando `useEffect`, embora não de uma maneira tão "limpa".

2. **O que é “JSX” e como ele se transforma em chamadas a React.createElement?**

   JSX nada mais é que um "syntax sugar" para chamadas da função `React.createElement`. É uma forma de escrever HTML com Javascript e descrever como um elemento HTML deve se comportar. Cada elemento "HTML like" do JSX vira uma chamada para `React.createElement`, que registra o tipo de elemento HTML a ser criado, os filhos desse elemento, as props dele, etc.

3. **Como você implementaria um “Protected Route” em React Router para proteger páginas que exigem login?**

   Na minha experiência, uma implementação do Protected Route é criar um componente "wrapper" que recebe uma `children` e retorna ela sem alterações visuais. Quase que um context provider. A diferença é que o componente executaria lógica de autenticação, verificando se o usuário possui as credenciais necessárias para acessar o componente que está sendo renderizado em `children` e, caso não possua, redirecione o usuário para uma página que ele possua acesso. Uma maneira inteligente de implementar isso com react-router (ou até com NextJS também) é a de criar um layout que envelopa as rotas protegidas e faz essa autenticação para qualquer acesso em rotas dentro daquele layout. Fica então um layout "invisível" que autentica o usuário e tira a necessidade de chamar o componente de Protected Route em todas as rotas, o que é mais sucetível a erro.

4. **Quais cuidados de segurança você tomaria ao armazenar tokens JWT no cliente?**

   Uma abordagem que eu pessoalmente gosto é a de tratar apenas de cookies `HttpOnly`, porque eles não podem ser acessados pelo client e, com a devida configuração, são enviados automaticamente em todas as requisições feitas ao servidor, o que permite uma autenticação quase constante. Dada a necessidade de guardar esse dado sensível no client, eu não guardaria ele no `localStorage`, já que dessa forma o token fica exposto e mutio vulnerável a ataques XSS, alem de que se torna necessária a manipulação do token diretamente ao fazer qualquer requisição pro back (passando o token nos headers da requisição). Sendo necessário, então, guardar esse token, mas ainda de maneira acessível, eu o guardaria nos cookies do navegador, o que ainda permitiria o envio automático do token nas requests para o back, e criaria barreiras de segurança, como o uso de um refresh token escondido para puxar um novo token sempre que o antigo expirar e for invalidado.

5. **Descreva como você usaria o Mock Service Worker (MSW) para simular endpoints de autenticação em ambiente de desenvolvimento.**

   RESPOSTA

6. **Como você faria tratamento de erros de rede (timeout, 4xx, 5xx) no seu fetch ou axios?**

   RESPOSTA

7. **Crie um custom hook useAuth() que exponha login(), logout() e o estado isAuthenticated. Mostre sua assinatura em TypeScript.**

   Considerando que precisei criar esse hook na minha aplicação para usar de interface para autenticação e manipuação do redux, irei apenas mostrar como eu implementei no meu código. O código a seguir possui lógica adicional usando react-query e redux.

   ```tsx
   import { useSelector, useDispatch } from 'react-redux';
   import type { RootState } from '../../store/store';
   import { loginSuccess, logoutUser } from '../../store/features/auth/authSlice';
   import { useNavigate } from 'react-router';
   import { loginSchema, useAuthenticateUser, useLogin, useLogout } from '../../queries/auth';
   import type { z } from 'zod';
   import Cookies from 'js-cookie';

   interface UseAuthReturn {
   isAuthenticated: boolean;
   user: { email: string; name: string } | null;
   login: (data: z.infer<typeof loginSchema>) => Promise<void>;
   loginStatus: {
      isLoginPending: boolean;
      isLoginSuccess: boolean;
      isLoginError: boolean;
      loginError: Error | null;
   };
   logout: () => Promise<void>;
   logoutStatus: {
      isLogoutPending: boolean;
      isLogoutSuccess: boolean;
      isLogoutError: boolean;
      logoutError: Error | null;
   };
   authenticate: () => Promise<void>;
   authenticateStatus: {
      isAuthenticateSuccess: boolean;
      isAuthenticatePending: boolean;
   };
   }

   export const useAuth = (): UseAuthReturn => {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

      const {
         mutate: loginMutation,
         isPending: isLoginPending,
         isSuccess: isLoginSuccess,
         isError: isLoginError,
         error: loginError,
      } = useLogin();
      const login = async (data: z.infer<typeof loginSchema>) => {
         return loginMutation(data, {
            onSuccess: data => {
            dispatch(loginSuccess({ user: data }));
            return navigate('/');
            },
            onError: error => {
            console.error(error);
            return error;
            },
         });
      };

      const {
         mutate: logoutMutation,
         isPending: isLogoutPending,
         isSuccess: isLogoutSuccess,
         isError: isLogoutError,
         error: logoutError,
      } = useLogout();
      const logout = async () => {
         return logoutMutation(undefined, {
            onSuccess: () => {
            dispatch(logoutUser());
            return navigate('/register');
            },
            onError: error => {
            console.error(error);
            },
         });
      };

      const {
         mutate: authenticateMutation,
         isSuccess: isAuthenticateSuccess,
         isPending: isAuthenticatePending,
      } = useAuthenticateUser();

      const authenticate = async () => {
         if (!Cookies.get('auth-token')) {
            return navigate('/register');
         }

         return authenticateMutation(undefined, {
            onSuccess: data => {
            dispatch(loginSuccess({ user: data }));
            },
            onError: () => {
            dispatch(logoutUser());
            return navigate('/register');
            },
         });
      };

      return {
         isAuthenticated,
         user,
         login,
         loginStatus: {
            isLoginPending,
            isLoginSuccess,
            isLoginError,
            loginError,
         },
         logout,
         logoutStatus: {
            isLogoutPending,
            isLogoutSuccess,
            isLogoutError,
            logoutError,
         },
         authenticate,
         authenticateStatus: {
            isAuthenticateSuccess,
            isAuthenticatePending,
         },
      };
   };
   ```

8. **Quando você optaria por usar Context API em vez de Redux? Quais são as vantagens e limitações de cada um?**

   São ferramentas diferentes para problemas diferentes, mas que podem ser usadas de forma similar. A Context API é uma solução simples do próprio React para passagem de props para os componentes filhos. Uma solução simples para problemas simples. A Context API não é um gerenciador de estados em si e re-renderizar todos os filhos quando algum estado é alterado, então não se torna uma solução muito ideal para guardar informações que mudam com frequência. É uma solução ideal para guardar dados que dificilmente vão ser alterados e, caso sejam, vão ser alterações mais pontuais. O exemplo mais comum é o de temas de UI. Já o redux é uma solução muito robusta feita de fato para gerenciamento de estados globais, com middlewares, uma estrutura mais "opinada" e de lógica centralizada. Ele também não tem a penalidade de desempenho da Context API quando tem troca de estado, então é o ideal para armazenar dados que mudam com frequência ou páginas muito dinâmicas e complexas, como uma dashboard com vários elementos, onde mudanças de estados em componentes individuais, como um filtro, precisariam ser propagados para componentes irmãos. O redux trás uma solução perfomática e menos verbosa para o que seria um caos de props propagation.

9. **Escreva um exemplo de teste unitário (usando Jest e React Testing Library) que verifica se o componente de login exibe mensagem de erro quando a API retorna 401.**

   RESPOSTA

10. **Cite duas técnicas para otimizar a performance de uma lista longa de itens em React (por exemplo, dezenas de milhares de elementos na tela).**
   
      RESPOSTA