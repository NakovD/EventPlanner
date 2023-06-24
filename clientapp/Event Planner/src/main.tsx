import 'index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from 'App';
import { queryClientConfig } from 'infrastructure/api/queryClient/QueryClientConfig';
import React from 'react';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient(queryClientConfig);

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
