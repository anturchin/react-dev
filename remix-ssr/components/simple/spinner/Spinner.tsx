import { ReactNode, useContext } from 'react';

import { ITheme } from '../../../core/context/themeContext/types';
import { ThemeContext } from '../../../core/context/themeContext';

import styles from './Spinner.module.css';

export const Spinner = (): ReactNode => {
  const { theme } = useContext<ITheme>(ThemeContext);
  return <div className={`${styles['spinner']} ${styles[`spinner-${theme}`]}`} role="status"></div>;
};
