import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Analytics } from '@vercel/analytics/react';
import './styles/base.css';
import './styles/layout.css';

const el = document.getElementById('root');
if (!el) throw new Error('Root element missing');

createRoot(el).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
