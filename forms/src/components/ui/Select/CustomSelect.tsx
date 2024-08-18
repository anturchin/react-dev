import { forwardRef } from 'react';

import { CustomSelectProps } from './CustomSelect.props.ts';

import styles from './CustomSelect.module.css';

export const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ ...props }, ref) => {
    return <select {...props} ref={ref} className={styles.select} />;
  }
);
