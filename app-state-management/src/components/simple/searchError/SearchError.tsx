import { ReactNode } from 'react';
import { ErrorTypeProps } from './types';

import './SearchError.css';

export const SearchError = (props: ErrorTypeProps): ReactNode => {
  const { message } = props;
  return <h2 className="search-error">{message}</h2>;
};
