import { CustomButton, CustomForm } from '../../components';
import { labelName } from '../../constants/labelName.ts';
import { countries } from '../../constants/countries.ts';
import { renderInput } from '../../helpers';

import styles from './Controlled.module.css';

export const Controlled = () => {
  const onSubmit = async () => {};

  return (
    <div className={styles.controlled}>
      <CustomForm onSubmit={onSubmit}>
        {labelName.map((label) => renderInput({ label, countries }))}
        <div className={styles.btn_wrapper}>
          <CustomButton disabled={false}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
