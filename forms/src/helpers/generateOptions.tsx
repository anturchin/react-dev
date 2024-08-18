import { Controller } from 'react-hook-form';

import { CustomLabel, CustomSelect } from '../components';
import { RefOption } from '../containers/Uncontrolled/Uncontrolled.props.ts';
import { ControlForm, RegisterForm } from './renderInput.ts';

import styles from '../containers/Controlled/Controlled.module.css';
import { Label } from '../containers/Controlled/Controlled.props.ts';

type OptionParam = {
  label: string;
  countries: string[];
  errorMap?: Record<string, string>;
  optionRef?: RefOption;
  register?: RegisterForm;
  control?: ControlForm;
};

export const generateOptions = ({
  label,
  countries,
  errorMap,
  optionRef,
  control,
}: OptionParam) => {
  if (control) {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <CustomLabel htmlFor={label}>{label}</CustomLabel>

          <Controller
            control={control}
            name={label as Label}
            render={({ field }) => (
              <CustomSelect
                name={label}
                id={label}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </CustomSelect>
            )}
          />
        </div>
        {errorMap && errorMap.country && (
          <p className={styles.errors}>{errorMap.country}</p>
        )}
      </div>
    );
  } else {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <CustomLabel htmlFor={label}>{label}</CustomLabel>

          <CustomSelect ref={optionRef?.current[label]} name={label} id={label}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </CustomSelect>
        </div>
        {errorMap && errorMap.country && (
          <p className={styles.errors}>{errorMap.country}</p>
        )}
      </div>
    );
  }
};
