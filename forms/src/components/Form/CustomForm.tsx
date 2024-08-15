import { CustomFormProps } from './CustomForm.props.ts';

import styles from './CustomForm.module.css';

export const CustomForm = (props: CustomFormProps) => {
  return (
    <form {...props} className={styles.form}>
      {props.children}
    </form>
  );
};
