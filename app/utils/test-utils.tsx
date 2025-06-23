import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { MemoryRouter } from 'react-router';
import { queryClient } from '@/lib/query-client';

interface AllProvidersProps {
  children: React.ReactNode;
}
const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    </MemoryRouter>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });
export * from '@testing-library/react';

export { customRender as render };

/*  WRAPPER PARA TESTES */

// Como o react-router não funciona com o render do @testing-library/react,
// precisei criar um wrapper que envolva o componente que queremos testar nos
// providers necessários, como Redux, QueryClient e MemoryRouter, evitando
// boilerplate de código.

// O MemoryRouter é necessário para que as rotas funcionem corretamente.
