import styles from '../containers/Controlled/Controlled.module.css';
import { CustomInput, CustomLabel } from '../components';
import { RefInput } from '../containers/Uncontrolled/Uncontrolled.props.ts';

export const generateInput = (
  label: string,
  type: 'file' | 'text' | 'checkbox' = 'text',
  errorMap?: Record<string, string>,
  formRefs?: RefInput
) => {
  return (
    <div key={label} className={styles.wrapper}>
      <div className={styles.input_item}>
        <CustomLabel htmlFor={label}>{label}</CustomLabel>
        <CustomInput
          ref={formRefs?.current[label]}
          name={label}
          id={label}
          type={type}
        />
      </div>
      {errorMap && errorMap[label] && (
        <p className={styles.errors}>{errorMap[label]}</p>
      )}
    </div>
  );
};
