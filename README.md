# [CashCoffee Demo](https://https://cashcoffee-demo.vercel.app/)

Demo de login e autenticação usando Typescript com react-router (framework) e TailwindCSS. Para fins de facilitar a visualização da demo foi feito um deploy na Vercel. É possível acessar a demo publicada clicando [aqui](https://https://cashcoffee-demo.vercel.app/).

## Tecnologias Utilizadas

- **React Router v7 + Vite** - Framework de roteamento

   Utilizei o React Router por requisito do projeto. Escolhi utilizar o modo framework da versão 7 por possuir uma configuração simplificada e por dar acesso a formatos diferentes de renderização, como SSR caso eu ache necessário.

- **Tailwind CSS** - Framework CSS utilitário

   Por questões de familiaridade preferi utilizar o Tailwind. Conheço bem as ferramentas do framework e já possuia em outros projetos componentes bem projetados com acessibilidade em mente. Dessa forma ficou mais fácil reaproveitar esse trabalho anterior, apenas adaptando para as necessidades específicas do projeto.

- **Redux Toolkit** - Gerenciamento de estado da aplicação

   Embora essa aplicação seja simples e a Context API service tranquilamente para lidar com a autenticação do usuário, preferi, por motivos de demonstração, utilizar o Redux para simular o desenvolvimento de uma aplicação mais complexa e que necessitaria de um gerenciamento de estados mais robusto.

- **React Hook Form + Zod** - Gerenciamento de formulários e validação de esquemas

   Um dos requisitos do sistema foi a apresentação de feedbacks na UI para o usuário nos formulários de registro e login. o React Hook Form com zod é a melhor maneira de lidar com erros de validação de formulário que eu conheço e me permitiu fazer todo esse gerenciamento sem necessitar de estados próprios do componente.

- **React Query (TanStack Query)** - Gerenciamento de estado de requisições

   Como um dos requisitos do sistema foi a apresentação de feedback para o usuário nos casos de os dados inseridos nos formulários não satisfazerem a validação imposta. O react query é uma biblioteca "favorita" minha que dá acesso expandido ao estado de requisições e me permite entregar feedbacks ainda mais complexos para o usuário, como mostrar algum elemento de loading enquanto a requisição de loading ou register ainda não foi concluida, ou mostrar um skeleton da página de dashboard enquanto a requisição de autenticação ainda não foi finalizada.

- **MSW (Mock Service Worker)** - Mocking de APIs

   Um dos requisitos do sistema foi o de utilizar um mock de API. O MSW é uma alternativa completa e que me permitiu simular requisições como seriam feitas em ambiente de produção, me permitindo até a trabalhar com gerenciamento de cookies e construir uma simulação tão segura quanto em ambientes de produção.

- **React Testing Library + Jest** - Testes end-to-end e integração com React

   TODO

## Funcionalidades

- **Autenticação** - Sistema de login e registro mockados
- **ProtectedRoute** - Área protegida para usuários autenticados
- **Formulários** - Validação com React Hook Form e Zod
- **Mocking** - APIs mockadas com MSW para desenvolvimento
- **Responsivo** - Interface adaptável com Tailwind CSS
- **Testes Unitários** - Testes end-to-end com Jest e React Testing Library

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
   pnpm test TODO
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

6. **Executar no modo de Produção (opcional)**

   Para fazer o build da aplicação:

   ```bash
   pnpm build
   ```

   Para iniciar o servidor de produção:

   ```bash
   pnpm start
   ```

## Decisões arquiteturais

- **Configurações do React Router**

   O React Router é uma biblioteca bem estabelecida e documentada. Ela foi dada como requisito não funcional da aplicação, mas não foi especificado o modo que deveria ser implementado. Por conta da caráter mais opinado e da flexibilidade para uso de ferramentas, decidi por usar o novo *Framework Mode*, que funciona de maneira similar ao NextJS, ferramenta a qual eu tenho muita familiaridade, mas ainda dando o caracteristico acesso a customização das "entranhas" do roteamento da aplicação de forma mais declarativa, alem de me permitir (de maneira opcional) utilizar SSR para algumas páginas.

- **Formato da pasta de componentes e Shadcn/ui**

   Acho importante mencionar a estrutura que utilizei para a pasta de componentes. Com a popularização do shadcn/ui, uma cli que facilita a criação inicial de componentes de UI para aplicações web usando TailwindCSS, algumas convenções de organização de componentes mudaram. Uma delas é a de organizar componentes atômicos de UI dentro de uma pasta interna a `/components` chamada `/ui`, onde componentes pequenos são declarados com seus nomes  usando kebab-case. Eu iniciei o shadcn/ui no projeto para facilitar a configuração do `app.css` e a criação de uma função utilitária que eu uso com muita frequência nas aplicações que trabalho chamada `cn()`, uma mistura de funções que visam unificar classes do TailwindCSS e tornar a estilização dinâmica de componentes mais fácil. Eu não cheguei a pegar nenhum componente diretamente do shadcn/ui em si. Os componentes `Button` e `Input`, por exemplo, são componentes com código reaproveitado de outras aplicações, embora tenham sido baseados nos componentes base do shadcn/ui.

- **Utilização de Redux**

   Um dos impasses que tive com essa aplicação foi a utilização da Context API ou Redux para fazer o gerenciamento da autenticação do usuário. Autenticação/Dados do usuário não são informações definidas no início da aplicação e não mudam com frequência, porem, dado que em uma aplicação da "vida real" dificilmente não utilizaria Redux e que essa é uma demonstração dos meus conhecimentos e práticas de desenvolvimento, optei por usar Redux e entregar uma solução mais completa.

- **Uso do react-hook-form e zod**

   É um requisito do aplicação a apresentação de feedbacks na UI para caso as informações inseridas no login e registro não fossem compatíveis ao esquema definido (ex: A senha deve ter no mínimo 8 caracteres). Para isso eu poderia ter usado a solução integrada do HTML com props `required`, `type='email'` ou `min={8}`, porem isso provavelmente tornaria o gerenciamento de erros mais complexo, alem de ser uma abordagem limitada de opções de regras. Por isso eu decidi usar uma solução mais robusta e que vejo como mais segura, usando `react-hook-form` e `zod`. Dessa forma eu consegui tipar o formulário, aplicar regras complexas, como requirir um campo de confirmação de senha, e gerenciar de maneira fácil e centralizada os erros de validação, isso tudo sem precisar de estados próprios do componente ou de malabarismos com Tailwind para exibir mensagens de erro.

- **Tratamento do token de autenticação**

   Outro impasse que tive foi de como tratar o token de autenticação do usuário. A abordagem que eu pessoalmente prefiro é a de nunca armazenar o token de autenticação de maneira exposta no client e de usar apenas tokens `HttpOnly`, porém um requisito foi o de guardar o token do usuário no client, então decidi por ainda salvar o token com cookies usando `Set-Cookie` no MSW, porem não de maneira "blindada" com `HttpOnly`. Dessa forma eu até tenho uma facilidade na hora de autenticar o usuário dentro do meu componente de Protected Route e cumpro o requisito do projeto, mas sem abdicar das vantagens de armazenar o token em um cookie, como a de não precisar tratar o token com JS para enviá-lo nos headers das requisições que eu fizer para o backend. Acredito que a maneira mais segura de todas seria a de guardar o token de autenticação dessa maneira como um session token, mas ainda possuindo um cookie `HttpOnly` com um refresh token de duração longa para renovar o token de sessão sempre que ele expirasse nem precisar deslogar o usuário toda vez que isso acontecesse.

- **Protected Route**

   Isso afetou diretamente a minha implementação do componente de Protected Route. A abordagem na qual eu sou familiarizado é a de criar um wrapper chamado ProtectedRoute que funciona quase que como um context provider, mas, ao invés de fornecer dados para os componentes filhos, apenas executa código de validação toda vez que for chamado. Isso funciona bem com aplicações que usam frameworks que permitem o uso de layouts, que é o caso de React Router. Assim, ao invés de possuir apenas um componente normal que precisaria ser implementado em toda página protegia, pude apenas tratar o ProtectedRoute como um layout que envelopa todas as rotas protegidas, lógica implementada em `@/app/routes.ts`. Nesse meu layout, então, eu faço a verificação do cookie de autenticação do usuário usando a biblioteca `js-cookie`. Como o cookie está acessível no client, eu consigo verificar a existência desse cookie com o token e, caso ele não exista, o usuário é automaticamente redirecionado para a tela de login. O cookie pode deixar de existir, porque na minha API mockada com MSW, assim como em qualquer backend em produção, o cookie é enviado com uma data para expirar. Já no caso de o cookie ainda existir, é chamada uma requisição específica para esse propósito que envia o cookie de maneira automática para o backend (possível por conta flag `withCredentials`), que checa se aquele cookie ainda é válido e retorna os dados do usuário, que por fim são guardados no Redux. Em uma aplicação robusta e mais segura, seria feito o envio de um cookie com um `refresh-token` para, caso o `auth-token` tenha expirado mas o `refresh-token` não, o `auht-token` anterior seja invalidado e um novo fosse criado.

- **Hook `useAuth()`**

   Essa autenticação, assim como o login e logout, foram feitos através de um custom hook criado para servir de interface para acessar esses métodos, assim como os seus estados de execução, acessíveis por conta do uso do react-query. Esses métodos em si também serviram de interface para simplificar as requisições feitas para o back, assim como as mudanças de estado no Redux com as dispatch functions necessárias. O hook retorna os métodos `login`, `logout` e `authenticate`, cada um responsável por executar mutations do react-query, que por sua vez utiliza axios como *fetcher*. Como benefício de utilizar o react-query, as mutations usadas fornecem também os estados de execução das requisições, que por sua vez podem ser repassados para o retorno do hook e utilizados nas páginas para tratamento na UI, possibilitanto, por exemplo, exibir uma tela de loading com skeletons enquanto a funcão `authenticate` ainda não foi finalizada.

## Resolução do questionário

1. **Explique brevemente a diferença entre componentes funcionais e de classe. Quando você usaria cada um?**

   A utilização de classes para declarar componentes foi a abordagem inicial do React quando o ecossistema ainda estava se desenvolvendo. Neles, os componentes criados instanciariam a classe `React.Component` e gerenciariam o estado usando `this.state` e `this.setState`. A classe possui vários métodos padrões que podem ser implementados pelo desenvolvedor, sendo o principal o método `render()`, que executa todo o código a cada renderização e retorna um fragmento de JSX, que é o que vai ser gerado de fato pelo componente. Existem vários outros métodos que ajudam a gerenciar o que acontece no ciclo de vida componente, como `componentDidMount()` ou `componentDidCatch()` e no geral é possível criar componentes bem completos usando esse método. Entretanto essa forma de criar componentes é mais comum em códigos legado e o método preferencial para se escrever React hoje em dia é usando function components. Eles no geral são mais simples e bem mais legíveis. São funções que retornam JSX e gerenciam estado usando react hooks, que são o grande "super poder" dos componentes funcionais. Praticamente todas os métodos de gerenciamento de ciclo de vida que existiam nos react class components possuem alternativas usando hooks e é possível até mesmo criar hooks personalizados, que podem misturar lógica própria com acesso a hooks do react e até de outras bibliotecas, como tanstack-query ou redux. No geral eu sempre utilizaria functional components para projetos novos ou que já tenham esse padrão e utilizaria class components para projetos legado que tenham sido escritos dessa maneira, mas sempre mantendo em mente uma possível refatoração. Existem poucas vantagens de usar class components. A única que eu me lembro é que é possível passar um callback como segundo parâmetro para `this.setState` e executar um bloco de código de maneira síncrona após a alteração de estado, mas algo similar pode ser alcançado usando `useEffect`, embora não de uma maneira tão "limpa".

1. **O que é “JSX” e como ele se transforma em chamadas a React.createElement?**

   JSX nada mais é que um "syntax sugar" para chamadas da função `React.createElement`. É uma forma de escrever HTML com Javascript e descrever como um elemento HTML deve se comportar. Cada elemento "HTML like" do JSX vira uma chamada para `React.createElement`, que registra o tipo de elemento HTML a ser criado, os filhos desse elemento, as props dele, etc.

1. **Como você implementaria um “Protected Route” em React Router para proteger páginas que exigem login?**

   Na minha experiência, uma implementação do Protected Route é criar um componente "wrapper" que recebe uma `children` e retorna ela sem alterações visuais. Quase que um context provider. A diferença é que o componente executaria lógica de autenticação, verificando se o usuário possui as credenciais necessárias para acessar o componente que está sendo renderizado em `children` e, caso não possua, redirecione o usuário para uma página que ele possua acesso. Uma maneira inteligente de implementar isso com react-router (ou até com NextJS também) é a de criar um layout que envelopa as rotas protegidas e faz essa autenticação para qualquer acesso em rotas dentro daquele layout. Fica então um layout "invisível" que autentica o usuário e tira a necessidade de chamar o componente de Protected Route em todas as rotas, o que é mais sucetível a erro.

1. **Quais cuidados de segurança você tomaria ao armazenar tokens JWT no cliente?**

   Uma abordagem que eu pessoalmente gosto é a de tratar apenas de cookies `HttpOnly`, porque eles não podem ser acessados pelo client e, com a devida configuração, são enviados automaticamente em todas as requisições feitas ao servidor, o que permite uma autenticação quase constante. Dada a necessidade de guardar esse dado sensível no client, eu não guardaria ele no `localStorage`, já que dessa forma o token fica exposto e mutio vulnerável a ataques XSS, alem de que se torna necessária a manipulação do token diretamente ao fazer qualquer requisição pro back (passando o token nos headers da requisição). Sendo necessário, então, guardar esse token, mas ainda de maneira acessível, eu o guardaria nos cookies do navegador, o que ainda permitiria o envio automático do token nas requests para o back, e criaria barreiras de segurança, como o uso de um refresh token escondido para puxar um novo token sempre que o antigo expirar e for invalidado.

1. **Descreva como você usaria o Mock Service Worker (MSW) para simular endpoints de autenticação em ambiente de desenvolvimento.**

   TODO

1. **Como você faria tratamento de erros de rede (timeout, 4xx, 5xx) no seu fetch ou axios?**

   TODO

1. **Crie um custom hook useAuth() que exponha login(), logout() e o estado isAuthenticated. Mostre sua assinatura em TypeScript.**

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

1. **Quando você optaria por usar Context API em vez de Redux? Quais são as vantagens e limitações de cada um?**

   São ferramentas diferentes para problemas diferentes, mas que podem ser usadas de forma similar. A Context API é uma solução simples do próprio React para passagem de props para os componentes filhos. Uma solução simples para problemas simples. A Context API não é um gerenciador de estados em si e re-renderizar todos os filhos quando algum estado é alterado, então não se torna uma solução muito ideal para guardar informações que mudam com frequência. É uma solução ideal para guardar dados que dificilmente vão ser alterados e, caso sejam, vão ser alterações mais pontuais. O exemplo mais comum é o de temas de UI. Já o redux é uma solução muito robusta feita de fato para gerenciamento de estados globais, com middlewares, uma estrutura mais "opinada" e de lógica centralizada. Ele também não tem a penalidade de desempenho da Context API quando tem troca de estado, então é o ideal para armazenar dados que mudam com frequência ou páginas muito dinâmicas e complexas, como uma dashboard com vários elementos, onde mudanças de estados em componentes individuais, como um filtro, precisariam ser propagados para componentes irmãos. O redux trás uma solução perfomática e menos verbosa para o que seria um caos de props propagation.

1. **Escreva um exemplo de teste unitário (usando Jest e React Testing Library) que verifica se o componente de login exibe mensagem de erro quando a API retorna 401.**

   TODO

1. **Cite duas técnicas para otimizar a performance de uma lista longa de itens em React (por exemplo, dezenas de milhares de elementos na tela).**

   A dificuldade de mostrar dezenas de milhares de componentes na tela é lidar com todas as renderizações que isso vai causar. O React possui algumas ferramentas para remediar esse problema com memoization e evitar que componentes sejam re-renderizados sem motivo. As três ferramentas principais seriam o `memo`, `useMemo` e `useCallback`. O `memo` é usado para memoização direto na criação de componentes, fazendo com que eles só sejam re-renderizados caso as props passadas pelo pai mudem, sendo ideal para componentes que não possuem estados internos e apenas exibem dados. Dessa forma os milhares de componentes da lista não serão re-renderizados caso o componente pai seja re-renderizado. Essa abordagem deve ser usada em par com `useMemo`, que memoiza computações de dados e evita processamento desnecessário, e com o `useCallback`, que memoiza declarações de funções, que é especialmente útil quando uma função no componente pai é passada como props para um componente filho. Dessa maneira, quando o componente pai é re-renderizado, o método declarado com `useCallback` não é redeclarado, evitando re-renderizações em componentes filho usando `memo`.

   Outro método que é mais uma prática ainda nas ferramentas do próprio React é a de sempre usar a prop `key` ao renderizar listas. Essa prop cria um indetificador único para elemento da longa lista permite ao React gerenciar qualquer mudança nela e evitar computações desnecessárias.

   Por fim, outro método seria o de renderizar apenas elementos visíveis em tela, o que não é uma funcionalidade nativa do próprio React, mas é algo facilmente implementável com uma biblioteca.
