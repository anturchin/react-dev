import { ReactNode, useContext } from 'react'

import { ThemeContext } from '@/core/context/themeContext';
import { ITheme } from '@/core/context/themeContext/types';

import styles from './Wrapper.module.css';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext<ITheme>(ThemeContext);
  return (
    <div className={`${styles['app-container']} ${styles[`${theme}-theme`]}`}>{children}</div>
  )
}