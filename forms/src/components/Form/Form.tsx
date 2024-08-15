import { CustomFormProps } from './Form.props.ts';

import styles from './Form.module.css';

export const Form = (props: CustomFormProps) => {
  return (
    <form {...props} className={styles.form}>
      {props.children}
    </form>
  );
};
