import { render, screen, waitFor } from '@/utils/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { createRoutesStub } from 'react-router';

import Login from '@/routes/auth/login/login';
import Register from './register';
import Dashboard from '@/routes/dashboard/dashboard';

import { server } from '@/mocks/node';
import Cookies from 'js-cookie';

describe('register', () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it('Should render the register page', () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    expect(screen.getByText('Cadastro')).toBeInTheDocument();
  });

  it('Should return an error if the name is not provided', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
  });

  it('Should return an error if the email is not provided', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
  });

  it('Should return an error if the email is not a valid email', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Cadastrar' });

    const emailInput = screen.getByLabelText('Email:');
    await user.type(emailInput, 'invalid-email@invalid');

    await user.click(button);

    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  it('Should return an error if the password is less than 8 characters', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    await user.type(emailInput, 'test@test.com');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(screen.getByText('Senha deve ter pelo menos 8 caracteres')).toBeInTheDocument();
  });

  it('Should return an error if the password does not contain at least one uppercase letter', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'aaaaaaaa');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(
      screen.getByText('Senha deve conter pelo menos uma letra maiúscula'),
    ).toBeInTheDocument();
  });

  it('Should return an error if the password does not contain at least one lowercase letter', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'AAAAAAAA');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(
      screen.getByText('Senha deve conter pelo menos uma letra minúscula'),
    ).toBeInTheDocument();
  });

  it('Should return an error if the password does not contain at least one number', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'Aaaaaaaa');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(screen.getByText('Senha deve conter pelo menos um número')).toBeInTheDocument();
  });

  it('Should return an error if the password does not contain at least one special character', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'Aaaaaaa4');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(
      screen.getByText(
        'Senha deve conter pelo menos um desses caracteres especiais: !@#$%^&*(),.?":{}|<>',
      ),
    ).toBeInTheDocument();
  });

  it('Should return an error if the password does not match the confirm password', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha:');

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'Aaaaaaa4');
    await user.type(confirmPasswordInput, 'Aaaaaaa5');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
  });

  it('Should redirect to the dashboard if the user inputs a valid register form and the server returns a 201 status code', async () => {
    server.use(
      http.post('/auth/register', async () => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';

        return new HttpResponse(JSON.stringify({ message: 'Usuário cadastrado com sucesso' }), {
          status: 201,
          headers: {
            'Set-Cookie': `auth-token=${token}; Max-Age=3600; Path=/; SameSite=Lax;`,
          },
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/',
        Component: Dashboard,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);

    const user = userEvent.setup();

    const nameInput = screen.getByLabelText('Nome:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha:');

    await user.type(nameInput, 'Lucas');
    await user.type(emailInput, 'lucas@gmail.com');
    await user.type(passwordInput, '!8iAa914');
    await user.type(confirmPasswordInput, '!8iAa914');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    await waitFor(() => {
      const authToken = Cookies.get('auth-token');
      expect(authToken).toBeDefined();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('Should show a loading state when the user inputs a valid register form and clicks on the register button', async () => {
    server.use(
      http.post('/auth/register', async () => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';

        await delay(1000);
        return new HttpResponse(JSON.stringify({ message: 'Usuário cadastrado com sucesso' }), {
          status: 201,
          headers: {
            'Set-Cookie': `auth-token=${token}; Max-Age=3600; Path=/; SameSite=Lax;`,
          },
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/',
        Component: Dashboard,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);

    const user = userEvent.setup();

    const nameInput = screen.getByLabelText('Nome:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha:');

    await user.type(nameInput, 'Lucas');
    await user.type(emailInput, 'lucas@gmail.com');
    await user.type(passwordInput, '!8iAa914');
    await user.type(confirmPasswordInput, '!8iAa914');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    expect(screen.getByTestId('loading-dots')).toBeInTheDocument();
  });

  it('Should redirect to the login page when the user clicks on the login link', async () => {
    const Stub = createRoutesStub([
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
    ]);

    render(<Stub initialEntries={['/register']} />);
    const user = userEvent.setup();

    const registerLink = screen.getByText('Entrar');
    await user.click(registerLink);

    await waitFor(() => {
      expect(screen.getByText('Faça login para continuar')).toBeInTheDocument();
    });
  });
});
