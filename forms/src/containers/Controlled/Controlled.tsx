import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CustomButton, CustomForm } from '../../components';
import { labelName } from '../../constants/labelName.ts';
import { renderInput } from '../../helpers';
import { ControlledForm } from './Controlled.props.ts';
import { validationSchema } from '../../validation/validation.schema.ts';

import { AppDispatch, RootState } from '../../store/store.ts';
import { setControlledData } from '../../store';

import styles from './Controlled.module.css';

export const Controlled = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<ControlledForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.countries);

  const onSubmit = (data: ControlledForm) => {
    const formData = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      country: data.country,
      terms: data.terms || false,
      picture: data.picture as File,
    };

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      const formDataWithImage = {
        ...formData,
        picture: base64String,
      };

      dispatch(setControlledData(formDataWithImage));
      navigate('/');
    };

    if (formData.picture) {
      reader.readAsDataURL(formData.picture);
    }
  };

  const errorMap = Object.keys(errors).reduce<Record<string, string>>(
    (acc, key) => {
      const error = errors[key as keyof typeof errors] as FieldError;
      acc[key] = error?.message || '';
      return acc;
    },
    {}
  );

  return (
    <div className={styles.controlled}>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        {labelName.map((label) =>
          renderInput({ label, countries, register, control, errorMap })
        )}
        <div className={styles.btn_wrapper}>
          <CustomButton disabled={!isValid}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
