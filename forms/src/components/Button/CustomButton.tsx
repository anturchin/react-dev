import { CustomButtonProps } from './CustomButton.props.ts';

import styles from './CustomButton.module.css';

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <button {...props} className={styles.bnt}>
      {props.children}
    </button>
  );
};
