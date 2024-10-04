import 'index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App } from 'features/app/App';
import { AuthLoader } from 'features/authentication/authLoader/AuthLoader';
import { queryClientConfig } from 'infrastructure/api/queryClient/QueryClientConfig';
import React from 'react';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient(queryClientConfig);

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthLoader>
        <App />
      </AuthLoader>
    </QueryClientProvider>
  </React.StrictMode>,
);
