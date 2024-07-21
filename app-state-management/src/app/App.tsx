import { ReactNode, useContext } from 'react';
import { Router } from '../routes/Router';
import { Provider } from 'react-redux';

import {
  ThemeContext,
  ThemeContextProvider,
} from '../core/context/themeContext';
import { store } from '../core/store';

import './App.css';

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}-theme`}>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
};

export const App = (): ReactNode => (
  <ThemeContextProvider>
    <AppContent />
  </ThemeContextProvider>
);
