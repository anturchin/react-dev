import { Controller } from 'react-hook-form';

import { CustomInput, CustomLabel } from '../components';
import {
  GENDER,
  RefInput,
} from '../containers/Uncontrolled/Uncontrolled.props.ts';
import { ControlForm, RegisterForm } from './renderInput.ts';
import { Label } from '../containers/Controlled/Controlled.props.ts';

import styles from '../containers/Controlled/Controlled.module.css';

type InputRadioParams = {
  label: string;
  errorMap?: Record<string, string>;
  formRefs?: RefInput;
  register?: RegisterForm;
  control?: ControlForm;
};

export const generateInputRadio = ({
  label,
  errorMap,
  formRefs,
  control,
}: InputRadioParams) => {
  if (control) {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <Controller
            control={control}
            name={label as Label}
            render={({ field }) => (
              <>
                <CustomInput
                  id={GENDER.MALE}
                  type="radio"
                  value={GENDER.MALE}
                  checked={field.value === GENDER.MALE}
                  onChange={() => field.onChange(GENDER.MALE)}
                />
                <CustomLabel htmlFor={GENDER.MALE}>male</CustomLabel>
                <CustomInput
                  id={GENDER.FEMALE}
                  type="radio"
                  value={GENDER.FEMALE}
                  checked={field.value === GENDER.FEMALE}
                  onChange={() => field.onChange(GENDER.FEMALE)}
                />
                <CustomLabel htmlFor={GENDER.FEMALE}>female</CustomLabel>
              </>
            )}
          />
        </div>
        {errorMap && errorMap.gender && (
          <p className={styles.errors}>{errorMap.gender}</p>
        )}
      </div>
    );
  } else {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <>
            <CustomInput
              ref={formRefs?.current[GENDER.MALE]}
              name="gender"
              id={GENDER.MALE}
              type="radio"
              value={GENDER.MALE}
            />
            <CustomLabel htmlFor={GENDER.MALE}>male</CustomLabel>
            <CustomInput
              ref={formRefs?.current[GENDER.FEMALE]}
              name="gender"
              id={GENDER.FEMALE}
              type="radio"
              value={GENDER.FEMALE}
            />
            <CustomLabel htmlFor={GENDER.FEMALE}>female</CustomLabel>
          </>
        </div>
        {errorMap && errorMap.gender && (
          <p className={styles.errors}>{errorMap.gender}</p>
        )}
      </div>
    );
  }
};
