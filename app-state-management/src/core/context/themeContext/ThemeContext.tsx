import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { ContextPropType, ITheme, Theme } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LsKey } from '../../services/localStorageService/types';

const INITIAL_STATE = {
  theme: Theme.LIGHT,
  handleChangeTheme: () => {},
};

export const ThemeContext = createContext<ITheme>(INITIAL_STATE);

export const ThemeContextProvider = ({
  children,
}: ContextPropType): ReactNode => {
  const [valueTheme, setValueTheme] = useLocalStorage(LsKey.THEME);
  const [theme, setTheme] = useState<Theme | string>(valueTheme || Theme.LIGHT);

  const handleChangeTheme = useCallback(
    (theme: Theme) => {
      setValueTheme(LsKey.THEME, theme);
      setTheme(theme);
    },
    [setValueTheme]
  );

  useEffect(() => {
    handleChangeTheme(theme as Theme);
  }, [handleChangeTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme as Theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
