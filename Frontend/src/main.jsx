import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import store from './redux/store.js';
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();
const helmetContext = {}
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider context={helmetContext}>
          <App />
          </HelmetProvider>
        </QueryClientProvider>
      </Provider>
  </StrictMode>,
)
