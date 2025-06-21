# [CashCoffee Demo](https://https://cashcoffee-demo.vercel.app/)

Demo de login e autenticação usando Typescript com react-router (framework) e TailwindCSS.

## Demo publicada
Para fins de facilitar a visualização da demo foi feito um deploy na Vercel. É possível acessar a demo publicada clicando [aqui](https://https://cashcoffee-demo.vercel.app/).

## Tecnologias Utilizadas

- **React Router v7** - Framework de roteamento
- **Tailwind CSS** - Framework CSS utilitário
- **Redux Toolkit** - Gerenciamento de estado da aplicação
- **React Query (TanStack Query)** - Gerenciamento de estado de requisições
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas para formulários
- **MSW (Mock Service Worker)** - Mocking de APIs
- **Vite** - Build tool e dev server
- **Jest** - Testes end-to-end
- **React Testing Library** - Integração de testes com React

## Pré-requisitos

Para rodar o projeto é preciso de:

- **Node.js** (versão 18 ou superior)
- **[pnpm](https://pnpm.io)** (gerenciador de pacotes)

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
   PARA ALTERAR
   ```

4. **Rode em modo de desenvolvimento**

   Para iniciar o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

A aplicação estará disponível em `http://localhost:5173`

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