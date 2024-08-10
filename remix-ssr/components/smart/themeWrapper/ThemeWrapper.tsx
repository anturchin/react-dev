import { ReactNode, useContext } from 'react';

import { ITheme } from '../../../core/context/themeContext/types';
import { ThemeContext, ThemeContextProvider } from '../../../core/context/themeContext';

import styles from './Wrapper.module.css';

const Content = ({ children }: { children: ReactNode }): ReactNode => {
  const { theme } = useContext<ITheme>(ThemeContext);
  return <div className={`${styles['app-container']} ${styles[`${theme}-theme`]}`}>{children}</div>;
};

export const ThemeWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <ThemeContextProvider>
      <Content>{children}</Content>
    </ThemeContextProvider>
  );
};
