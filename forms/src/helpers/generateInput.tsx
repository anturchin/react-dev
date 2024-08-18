import { Controller } from 'react-hook-form';

import { CustomInput, CustomLabel } from '../components';
import { RefInput } from '../containers/Uncontrolled/Uncontrolled.props.ts';
import { ControlForm, RegisterForm } from './renderInput.ts';
import { Label } from '../containers/Controlled/Controlled.props.ts';

import styles from '../containers/Controlled/Controlled.module.css';

type InputParam = {
  label: string;
  type: 'file' | 'text' | 'checkbox';
  errorMap?: Record<string, string>;
  formRefs?: RefInput;
  register?: RegisterForm;
  control?: ControlForm;
};

export const generateInput = ({
  label,
  type,
  errorMap,
  formRefs,
  control,
}: InputParam) => {
  return (
    <div key={label} className={styles.wrapper}>
      <div className={styles.input_item}>
        <CustomLabel htmlFor={label}>{label}</CustomLabel>
        {control ? (
          <Controller
            name={label as Label}
            control={control}
            render={({ field }) => (
              <CustomInput
                name={label}
                id={label}
                type={type}
                onChange={(e) => {
                  if (type === 'checkbox') {
                    field.onChange(e.target.checked);
                  } else if (type === 'file') {
                    field.onChange(e.target.files?.[0] || null);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            )}
          />
        ) : (
          <CustomInput
            ref={formRefs?.current[label]}
            name={label}
            id={label}
            type={type}
          />
        )}
      </div>
      {errorMap && errorMap[label] && (
        <p className={styles.errors}>{errorMap[label]}</p>
      )}
    </div>
  );
};
