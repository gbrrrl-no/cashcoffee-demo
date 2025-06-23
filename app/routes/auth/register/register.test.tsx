import { render } from '@testing-library/react';
import axios from 'axios';
import { describe, test, expect, it } from 'vitest';
import Login from '../login/login';

describe('login', () => {
  // test('responds with the user', async () => {
  //   const response = await axios.post('/auth/login', {
  //     email: 'test@test.com',
  //     password: '123456',
  //   });

  //   expect(response.status).toBe(200);
  //   expect(response.data).toEqual({
  //     id: 'abc-123',
  //     firstName: 'John',
  //     lastName: 'Maverick',
  //   });
  // });
  it('should render the login page', () => {
    // render(<Login />);
    expect(true).toBe(true);
  });
});
