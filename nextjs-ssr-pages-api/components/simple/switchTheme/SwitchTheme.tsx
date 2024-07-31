import { ReactNode, useContext } from 'react';

import { ThemeContext } from '@/core/context/themeContext';
import { ITheme, Theme } from '@/core/context/themeContext/types';

import styles from './SwitchTheme.module.css';

export const SwitchTheme = (): ReactNode => {
  const { theme, handleChangeTheme } = useContext<ITheme>(ThemeContext);

  const onToggleTheme = (): void => {
    const newTheme = (theme as string) === 'light' ? 'dark' : 'light';
    handleChangeTheme(newTheme as Theme);
  };

  return (
    <div className={`${styles['toggle-switch']}`}>
      <label className={`${styles['label']}`}>
        <input
          className={`${styles['input-checkbox']}`}
          type="checkbox"
          onChange={onToggleTheme}
          checked={theme === 'dark'}
        />
        <span className={`${styles['slider']}`} />
      </label>
    </div>
  );
};
