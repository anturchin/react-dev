import { CustomButtonProps } from './Button.props.ts';

import styles from './Button.module.css';

export const Button = (props: CustomButtonProps) => {
  return <button {...props} className={styles.bnt}>{props.children}</button>
};
