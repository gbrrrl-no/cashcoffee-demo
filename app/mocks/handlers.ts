import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/register', () => {
    return HttpResponse.json({
      message: 'User registered successfully', // TODO: enable all test cases
    });
  }),
];
