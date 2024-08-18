import { CustomLabelProps } from './CustomLabel.props.ts';

import styles from './CustomLabel.module.css';

export const CustomLabel = (props: CustomLabelProps) => {
  return (
    <label {...props} className={styles.label}>
      {props.children}
    </label>
  );
};
