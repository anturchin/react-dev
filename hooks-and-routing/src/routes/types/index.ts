import { ReactNode } from 'react';

export type ChildrenRoutesType = {
  path: string;
  element: ReactNode;
};

export type RoutesType = {
  path: string;
  element: ReactNode;
  errorElement?: ReactNode;
  children?: ChildrenRoutesType[];
};
