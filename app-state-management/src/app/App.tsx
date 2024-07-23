import { ReactNode, useContext } from 'react';
import { Router } from '../routes/Router';
import { Provider } from 'react-redux';

import {
  ThemeContext,
  ThemeContextProvider,
} from '../core/context/themeContext';
import { store } from '../core/store';
import { ITheme } from '../core/context/themeContext/types';

import './App.css';

const AppContent = (): ReactNode => {
  const { theme } = useContext<ITheme>(ThemeContext);

  return (
    <div className={`app-container ${theme}-theme`}>
      <Router />
    </div>
  );
};

export const App = (): ReactNode => (
  <ThemeContextProvider>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </ThemeContextProvider>
);
