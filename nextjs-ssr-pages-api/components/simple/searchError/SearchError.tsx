import { ErrorTypeProps } from './types';

import styles from './SearchError.module.css';

export const SearchError = (props: ErrorTypeProps): JSX.Element => {
  const { message } = props;
  return <h2 className={`${styles['search-error']}`}>{message}</h2>;
};
