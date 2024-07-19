import { createContext, ReactNode, useEffect, useState } from 'react';
import { ContextPropType, Theme } from './types';

export const ThemeContext = createContext<Theme>(Theme.LIGHT);

export const ThemeContextProvider = ({
  children,
}: ContextPropType): ReactNode => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    handleChangeTheme(theme);
  }, [theme]);

  const handleChangeTheme = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
