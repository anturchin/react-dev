'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { LsKey } from '@/core/services/localStorageService/types';
import { ContextPropType, ITheme, Theme } from './types';

const INITIAL_STATE = {
  theme: Theme.LIGHT,
  handleChangeTheme: () => {},
};

export const ThemeContext = createContext<ITheme>(INITIAL_STATE);

export const ThemeContextProvider = ({ children }: ContextPropType): JSX.Element => {
  const [valueTheme, setValueTheme] = useLocalStorage(LsKey.THEME);
  const [theme, setTheme] = useState<Theme | string>(Theme.LIGHT);

  const handleChangeTheme = useCallback(
    (theme: Theme) => {
      setValueTheme(LsKey.THEME, theme);
      setTheme(theme);
    },
    [setValueTheme]
  );

  useEffect(() => {
    if (valueTheme) {
      setTheme(valueTheme);
    }
  }, [valueTheme]);

  return (
    <ThemeContext.Provider value={{ theme: theme as Theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
