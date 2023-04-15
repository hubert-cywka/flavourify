import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { setupInterceptors } from './services/ApiClient';
import { AlertProvider } from './AlertProvider';
import {
  setCustomViewportHeightVariable,
  setCustomViewportSizeVariableUpdater,
  setCustomViewportWidthVariable
} from './utility/viewportSizeVariable';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

setupInterceptors();
setCustomViewportWidthVariable();
setCustomViewportHeightVariable();
setCustomViewportSizeVariableUpdater();

root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
