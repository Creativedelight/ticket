import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container); // React 18 API
  root.render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}
