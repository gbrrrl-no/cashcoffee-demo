import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { queryClient } from '@/lib/query-client';

interface AllProvidersProps {
  children: React.ReactNode;
}
const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });
export * from '@testing-library/react';

export { customRender as render };

// wrapper para testes com Redux e QueryClient evitando boilerplate de código.
