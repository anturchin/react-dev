import { useForm } from 'react-hook-form';

import { CustomButton, CustomForm } from '../../components';
import { labelName } from '../../constants/labelName.ts';
import { countries } from '../../constants/countries.ts';
import { renderInput } from '../../helpers';
import { ControlledForm } from './Controlled.props.ts';

import styles from './Controlled.module.css';

export const Controlled = () => {
  const onSubmit = async (data: ControlledForm) => {
    console.log(data);
  };

  const { handleSubmit, control, register } = useForm<ControlledForm>();

  return (
    <div className={styles.controlled}>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        {labelName.map((label) =>
          renderInput({ label, countries, register, control })
        )}
        <div className={styles.btn_wrapper}>
          <CustomButton disabled={false}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
