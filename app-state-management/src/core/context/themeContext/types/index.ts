import { ReactNode } from 'react';

export const enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ITheme {
  theme: Theme;
  handleChangeTheme: (theme: Theme) => void;
}

export type ContextPropType = {
  children: ReactNode;
};
