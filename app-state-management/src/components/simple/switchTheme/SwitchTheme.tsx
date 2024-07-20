import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../../core/context/themeContext';
import { Theme } from '../../../core/context/themeContext/types';

import './SwitchTheme.css';

export const SwitchTheme = (): ReactNode => {
  const { theme, handleChangeTheme } = useContext(ThemeContext);

  const onToggleTheme = () => {
    const newTheme = (theme as string) === 'light' ? 'dark' : 'light';
    handleChangeTheme(newTheme as Theme);
  };

  return (
    <div className="toggle-switch">
      <label className="label">
        <input
          className="input-checkbox"
          type="checkbox"
          onChange={onToggleTheme}
          checked={theme === 'dark'}
        />
        <span className="slider" />
      </label>
    </div>
  );
};
