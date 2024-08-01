import { useContext } from 'react';

import { ThemeContext } from '@/core/context/themeContext';
import { ITheme } from '@/core/context/themeContext/types';

import styles from './Spinner.module.css';

export const Spinner = (): JSX.Element => {
  const { theme } = useContext<ITheme>(ThemeContext);
  return <div className={`${styles['spinner']} ${styles[`spinner-${theme}`]}`} role="status"></div>;
};
