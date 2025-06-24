import { render, screen, waitFor } from '@/utils/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse, delay } from 'msw';
import { createRoutesStub } from 'react-router';

import Register from '@/routes/auth/register/register';
import Dashboard from './dashboard';

import { server } from '@/mocks/node';
import Cookies from 'js-cookie';
import Readme from '../readme/readme';
import ProtectedRoute from '@/components/ProtectedRoute';
import { reset as resetAuth } from '@/store/features/auth/authSlice';
import { store } from '@/store/store';

describe('dashboard', () => {
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(resetAuth());
  });

  it('Should render the dashboard page', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: Dashboard,
      },
    ]);

    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  it('Should render a loading state when the user is not authenticated', async () => {
    server.use(
      http.get('/auth/me', async () => {
        return new HttpResponse(JSON.stringify({ name: 'Lucas', email: 'lucas@gmail.com' }), {
          status: 200,
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/register',
        Component: Register,
      },
    ]);

    Cookies.set('auth-token', '123');
    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-loading-state')).toBeInTheDocument();
    });
  });

  it('Should redirect to the register page when the user is not authenticated', async () => {
    server.use(
      http.get('/auth/me', async () => {
        return new HttpResponse(undefined, {
          status: 401,
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/register',
        Component: Register,
      },
    ]);

    Cookies.set('auth-token', '123');
    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(screen.getByText('Cadastro')).toBeInTheDocument();
    });
  });

  it('Should redirect to the README page when the user clicks on the readme link', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: Dashboard,
      },
      {
        path: '/readme',
        Component: Readme,
      },
    ]);

    render(<Stub initialEntries={['/']} />);
    const user = userEvent.setup();

    const readmeLink = screen.getByText('Leia o README');
    await user.click(readmeLink);

    await waitFor(() => {
      expect(screen.getByText('Voltar para o dashboard')).toBeInTheDocument();
    });
  });

  it('Should redirect to the register page when the user clicks on the logout button', async () => {
    server.use(
      http.post('/auth/logout', async () => {
        return new HttpResponse(JSON.stringify({ message: 'Usuário deslogado com sucesso' }), {
          status: 200,
          headers: {
            'Set-Cookie': `auth-token=; Max-Age=0; Path=/; SameSite=Lax;`,
          },
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: '/',
        Component: Dashboard,
      },
      {
        path: '/register',
        Component: Register,
      },
    ]);

    render(<Stub initialEntries={['/']} />);
    const user = userEvent.setup();

    const logoutButton = screen.getByText('Sair');
    await user.click(logoutButton);

    await waitFor(() => {
      const authToken = Cookies.get('auth-token');
      expect(authToken).toBeUndefined();
      expect(screen.getByText('Cadastro')).toBeInTheDocument();
    });
  });
});
