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
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax`,
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
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax`,
        },
      },
    );
  }
});

export const authHandlers = [registerHandler, loginHandler];
