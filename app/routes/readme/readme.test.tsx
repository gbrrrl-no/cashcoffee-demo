import { render, screen, waitFor } from '@/utils/test-utils';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';

import Dashboard from '@/routes/dashboard/dashboard';
import Readme from '../readme/readme';

describe('readme', () => {
  it('Should redirect to the dashboard page when the user clicks on the back to dashboard button', async () => {
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

    render(<Stub initialEntries={['/readme']} />);
    const user = userEvent.setup();

    const backToDashboardButton = screen.getByText('Voltar para o dashboard');
    await user.click(backToDashboardButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
