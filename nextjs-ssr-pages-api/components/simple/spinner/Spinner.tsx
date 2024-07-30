import { ReactNode, useContext } from 'react';

import { ThemeContext } from '@/core/context/themeContext';
import { ITheme } from '@/core/context/themeContext/types';

import './Spinner.css';

export const Spinner = (): ReactNode => {
  const { theme } = useContext<ITheme>(ThemeContext);
  return <div className={`spinner spinner-${theme}`} role="status"></div>;
};