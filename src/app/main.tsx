import App from 'App';
import { ThemeProvider } from 'app/providers/ThemeProvider/index.ts';
import 'app/styles/index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  </StoreProvider>,
);
