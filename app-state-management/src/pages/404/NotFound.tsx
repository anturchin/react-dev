import { ReactNode } from 'react';
import { PAGE_NOT_FOUND } from '../../core/constants';

import './NotFound.css';

export const NotFound = (): ReactNode => {
  return <h2 className="not-found">{PAGE_NOT_FOUND}</h2>;
};
