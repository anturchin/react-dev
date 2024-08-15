import { CustomInputProps } from './CustomInput.props.ts';

import styles from './CustomInput.module.css';

export const CustomInput = (props: CustomInputProps) => {
  return <input {...props} className={styles.input} />;
};
