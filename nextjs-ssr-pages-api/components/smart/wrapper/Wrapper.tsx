import { ReactNode, useContext } from 'react';

import {
  ThemeContext,
  ThemeContextProvider,
} from '@/core/context/themeContext';
import { ITheme } from '@/core/context/themeContext/types';

import styles from './Wrapper.module.css';

const Content = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext<ITheme>(ThemeContext);
  return (
    <div className={`${styles['app-container']} ${styles[`${theme}-theme`]}`}>
      {children}
    </div>
  );
};

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContextProvider>
      <Content>{children}</Content>
    </ThemeContextProvider>
  );
};
