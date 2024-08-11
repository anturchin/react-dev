import { ReactNode } from 'react';

import { ErrorTypeProps } from './types';

import styles from './SearchError.module.css';

export const SearchError = (props: ErrorTypeProps): ReactNode => {
  const { message } = props;
  return (
    <div className={styles['wrapper']}>
      <h2 className={`${styles['search-error']}`} role="error">
        {message}
      </h2>
    </div>
  );
};
