import { ReactNode } from 'react';

export type RoutesType = {
  path: string;
  element: ReactNode;
  errorElement?: ReactNode;
};
