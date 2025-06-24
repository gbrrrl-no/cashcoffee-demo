import { render, screen, waitFor } from '@/utils/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { createRoutesStub } from 'react-router';

import Login from './login';
import Register from '@/routes/auth/register/register';
import Dashboard from '@/routes/dashboard/dashboard';

import { server } from '@/mocks/node';
import Cookies from 'js-cookie';

describe('login', () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it('Should render the login page', () => {
    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);
    expect(screen.getByText('Faça login para continuar')).toBeInTheDocument();
  });

  it('Should return an error if the email is not provided', async () => {
    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText('Senha:');
    await user.type(passwordInput, '123456789');

    const button = screen.getByRole('button', { name: 'Entrar' });
    await user.click(button);

    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
  });

  it('Should return an error if the password is not provided', async () => {
    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    await user.type(emailInput, 'test@test.com');

    const button = screen.getByRole('button', { name: 'Entrar' });
    await user.click(button);

    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
  });

  it('Should return an error if the email is not a valid email', async () => {
    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Entrar' });

    const emailInput = screen.getByLabelText('Email:');
    await user.type(emailInput, 'invalid-email@invalid');

    await user.click(button);

    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  it('Should return an error if either the email or password are invalid', async () => {
    server.use(
      http.post('/auth/login', async () => {
        return new HttpResponse(JSON.stringify({ message: 'Email ou senha inválidos.' }), {
          status: 401,
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'invalid-email@invalid.com');
    await user.type(passwordInput, '123456789');

    const button = screen.getByRole('button', { name: 'Entrar' });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Email ou senha inválidos.')).toBeInTheDocument();
    });
  });

  it('Should redirect to the dashboard if the user uses the correct email and password', async () => {
    server.use(
      http.post('/auth/login', async () => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';

        return new HttpResponse(JSON.stringify({ name: 'Lucas', email: 'lucas@gmail.com' }), {
          status: 200,
          headers: {
            'Set-Cookie': `auth-token=${token}; Max-Age=3600; Path=/; SameSite=Lax;`,
          },
        });
      }),
      http.get('/auth/me', async () => {
        return new HttpResponse(JSON.stringify({ name: 'Lucas', email: 'lucas@gmail.com' }), {
          status: 200,
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/',
        Component: Dashboard,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'lucas@gmail.com');
    await user.type(passwordInput, '!8iAa914');

    const button = screen.getByRole('button', { name: 'Entrar' });
    await user.click(button);

    await waitFor(() => {
      const authToken = Cookies.get('auth-token');
      expect(authToken).toBeDefined();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('Should show a loading state when the user inputs a valid login form and clicks on the login button', async () => {
    server.use(
      http.post('/auth/login', async () => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';

        await delay(1000);
        return new HttpResponse(JSON.stringify({ name: 'Lucas', email: 'lucas@gmail.com' }), {
          status: 200,
          headers: {
            'Set-Cookie': `auth-token=${token}; Max-Age=3600; Path=/; SameSite=Lax;`,
          },
        });
      }),
      http.get('/auth/me', async () => {
        return new HttpResponse(JSON.stringify({ name: 'Lucas', email: 'lucas@gmail.com' }), {
          status: 200,
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/',
        Component: Dashboard,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');

    await user.type(emailInput, 'lucas@gmail.com');
    await user.type(passwordInput, '!8iAa914');

    const button = screen.getByRole('button', { name: 'Entrar' });
    await user.click(button);

    expect(screen.getByTestId('loading-dots')).toBeInTheDocument();
  });

  it('Should redirect to the register page when the user clicks on the register link', async () => {
    const Stub = createRoutesStub([
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/login']} />);
    const user = userEvent.setup();

    const registerLink = screen.getByText('Cadastrar-se');
    await user.click(registerLink);

    await waitFor(() => {
      expect(screen.getByText('Cadastro')).toBeInTheDocument();
    });
  });
});
