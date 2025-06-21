import { http, HttpResponse } from 'msw';
import { loginSchema, registerSchema } from '../queries/auth';

export const registerHandler = http.post('/auth/register', async ({ request }) => {
  const data = await request.json();
  const validatedData = registerSchema.parse(data);
  const { name, email } = validatedData;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';
  return new HttpResponse(
    JSON.stringify({
      name,
      email,
    }),
    {
      status: 201,
      headers: {
        'set-cookie': `auth-token=${token}`,
      },
    },
  );
});

export const loginHandler = http.post('/auth/login', async ({ request }) => {
  const data = await request.json();
  const validatedData = loginSchema.parse(data);
  const { email, password } = validatedData;
  if (email === 'lucas@gmail.com' && password === '!8iAa914') {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';
    return new HttpResponse(
      JSON.stringify({
        name: 'Lucas',
        email,
      }),
      {
        status: 200,
        headers: {
          'set-cookie': `auth-token=${token}`,
        },
      },
    );
  }

  return new HttpResponse(
    JSON.stringify({
      message: 'Invalid credentials',
    }),
    {
      status: 401,
    },
  );
});

export const meHandler = http.get('/auth/me', async ({ cookies }) => {
  if (
    cookies['auth-token'] !==
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY'
  ) {
    return new HttpResponse(
      JSON.stringify({
        message: 'Invalid token',
      }),
      {
        status: 401,
      },
    );
  }

  return new HttpResponse(
    JSON.stringify({
      name: 'Lucas',
      email: 'lucas@gmail.com',
    }),
    {
      status: 200,
    },
  );
});

export const logoutHandler = http.post('/auth/logout', async ({ request, params, cookies }) => {
  console.log(request, params, cookies);
  return new HttpResponse(
    JSON.stringify({
      message: 'Logged out successfully',
    }),
    {
      status: 200,
      headers: {
        'set-cookie': 'auth-token=',
      },
    },
  );
});

export const authHandlers = [registerHandler, loginHandler, meHandler, logoutHandler];
