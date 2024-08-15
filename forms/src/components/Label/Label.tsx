import { CustomLabelProps } from './Label.props.ts';

import styles from './Label.module.css';

export const Label = (props: CustomLabelProps) => {
  return (
    <label {...props} className={styles.label}>
      {props.children}
    </label>
  );
};
