import styles from '../containers/Controlled/Controlled.module.css';
import { CustomLabel, CustomSelect } from '../components';
import { RefOption } from '../containers/Uncontrolled/Uncontrolled.props.ts';

export const generateOptions = (
  label: string,
  countries: string[],
  errorMap?: Record<string, string>,
  optionRef?: RefOption
) => {
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
};
