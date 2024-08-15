import { CustomInputProps } from './Input.props.ts';

import styles from './Input.module.css';

export const Input = (props: CustomInputProps) => {
  return <input {...props} className={styles.input} />;
};
