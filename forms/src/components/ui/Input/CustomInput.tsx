import { forwardRef } from 'react';

import { CustomInputProps } from './CustomInput.props.ts';

import styles from './CustomInput.module.css';

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ ...props }, ref) => {
    return <input {...props} ref={ref} className={styles.input} />;
  }
);
