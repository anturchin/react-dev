import {
  CustomButton,
  CustomForm,
  CustomInput,
  CustomLabel,
} from '../../components';

import styles from './Uncontrolled.module.css';

const LabelName: string[] = [
  'name',
  'age',
  'email',
  'password',
  'password',
  'gender',
  'picture',
  'country',
  'T&C',
];

export const Uncontrolled = () => {
  return (
    <div className={styles.uncontrolled}>
      <CustomForm onSubmit={(e) => e.preventDefault()}>
        {LabelName.map((label) => {
          return (
            <div key={label} className={styles.input_item}>
              <CustomLabel>{label}</CustomLabel>
              <CustomInput isError={false} />
            </div>
          );
        })}
        <div className={styles.btn_wrapper}>
          <CustomButton isActive={true}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
