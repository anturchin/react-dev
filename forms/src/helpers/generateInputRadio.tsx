import styles from '../containers/Controlled/Controlled.module.css';
import { CustomInput, CustomLabel } from '../components';
import {
  GENDER,
  RefInput,
} from '../containers/Uncontrolled/Uncontrolled.props.ts';

export const generateInputRadio = (
  label: string,
  errorMap?: Record<string, string>,
  formRefs?: RefInput
) => {
  return (
    <div key={label} className={styles.wrapper}>
      <div className={styles.input_item}>
        <CustomInput
          ref={formRefs?.current[GENDER.MALE]}
          name={label}
          id={GENDER.MALE}
          type="radio"
        />
        <CustomLabel htmlFor={GENDER.MALE}>male</CustomLabel>
        <CustomInput
          ref={formRefs?.current[GENDER.FEMALE]}
          name={label}
          id={GENDER.FEMALE}
          type="radio"
        />
        <CustomLabel htmlFor={GENDER.FEMALE}>female</CustomLabel>
      </div>
      {errorMap && errorMap.gender && (
        <p className={styles.errors}>{errorMap.gender}</p>
      )}
    </div>
  );
};
