import { ReactNode, useContext } from 'react';
import { Router } from '../routes/Router';
import {
  ThemeContext,
  ThemeContextProvider,
} from '../core/context/themeContext';

import './App.css';

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}-theme`}>
      <Router />
    </div>
  );
};

export const App = (): ReactNode => (
  <ThemeContextProvider>
    <AppContent />
  </ThemeContextProvider>
);
