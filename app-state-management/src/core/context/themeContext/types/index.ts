import { ReactNode } from 'react';

export const enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ContextPropType = {
  children: ReactNode;
};
