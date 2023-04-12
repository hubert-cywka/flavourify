import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { setupInterceptors } from './services/ApiClient';
import { AlertProvider } from './AlertProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

setupInterceptors();

root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
