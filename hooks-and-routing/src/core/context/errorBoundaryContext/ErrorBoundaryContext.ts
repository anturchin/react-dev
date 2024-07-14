import { createContext } from 'react';
import { IErrorBoundaryContext } from './types';

export const ErrorBoundaryContext = createContext<IErrorBoundaryContext | null>(
  null
);
