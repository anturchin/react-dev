import { ReactNode } from 'react';
import { Router } from '../routes/Router';
import { ThemeContextProvider } from '../core/context/themeContext';

import './App.css';

export const App = (): ReactNode => (
  <ThemeContextProvider>
    <Router />
  </ThemeContextProvider>
);
