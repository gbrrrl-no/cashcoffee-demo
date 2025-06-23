import { render, screen } from '@/utils/test-utils';
import axios from 'axios';
import { describe, expect, it } from 'vitest';
import Login from './login';

describe('login', () => {
  it('should render the login page', () => {
    render(<Login />);
    expect(screen.getByText('Faça login para continuar')).toBeInTheDocument();
  });

  it('should teste if the api works', async () => {
    const response = await axios.post('/auth/login', {
      email: 'test@test.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  });
});
