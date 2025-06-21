import { http, HttpResponse, delay } from 'msw';
import { loginSchema, registerSchema } from '../queries/auth';

export const registerHandler = http.post('/auth/register', async ({ request }) => {
  const randomDelay = Math.floor(Math.random() * 1000) + 250;

  const data = await request.json();
  const validatedData = registerSchema.parse(data);
  const { name, email } = validatedData;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFkIn0.eyJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIThpQWE5MTQifQ.jug0Mr-pb_WmL6q1HqmaSGELyg8pnNeopG2uAu-NyJY';

  await delay(randomDelay);
  return new HttpResponse(
    JSON.stringify({
      name,
      email,
    }),
    {
      status: 201,
      headers: {
        'Set-Cookie': `auth-token=${token}; Max-Age=3600; Path=/; SameSite=Lax;`,
      },
    },
  );
});

export const loginHandler = http.post('/auth/login', async ({ request }) => {
  const data = await request.json();
  const validatedData = loginSchema.parse(data);
  const { email, password } = validatedData;

  const randomDelay = Math.floor(Math.random() * 1000) + 250;
  await delay(randomDelay);

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
          'Set-Cookie': `auth-token=${token}; Max-Age=3600; Path=/; SameSite=Lax;`,
        },
      },
    );
  } else {
    return new HttpResponse(
      JSON.stringify({
        message: 'Invalid credentials',
      }),
      {
        status: 401,
      },
    );
  }
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
        'Set-Cookie': `auth-token=; Max-Age=0; Path=/; SameSite=Lax;`,
      },
    },
  );
});

export const authHandlers = [registerHandler, loginHandler, meHandler, logoutHandler];
