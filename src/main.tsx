import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { initGA } from './lib/analytics';
import './styles/source.css';
import './styles/app.css';
import './styles/home-hero.css';
import './styles/navbar.css';
import './styles/auth.css';

// Initialize Google Analytics 4 with Measurement ID G-VSMZCYHTT9
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
