import { createRef, FormEvent, RefObject, useRef } from 'react';
import { ValidationError } from 'yup';

import {
  CustomButton,
  CustomForm,
  CustomInput,
  CustomLabel,
} from '../../components';
import { validationSchema } from '../../validation/validation.schema.ts';
import { setUncontrolledData } from '../../store';

import styles from './Uncontrolled.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';

const LabelName: string[] = [
  'name',
  'age',
  'gender',
  'email',
  'password',
  'confirmPassword',
  'picture',
  'country',
  'terms',
];

export const Uncontrolled = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formRefs = useRef<{ [key: string]: RefObject<HTMLInputElement> }>({
    name: createRef(),
    age: createRef(),
    email: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
    gender: createRef(),
    picture: createRef(),
    country: createRef(),
    terms: createRef(),
  });

  const getInputType = (label: string) => {
    switch (label) {
      case 'picture':
        return 'file';
      case 'terms':
        return 'checkbox';
      case 'gender':
        return 'radio';
      default:
        return 'text';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: formRefs.current.name.current?.value || '',
      age: parseInt(formRefs.current.age.current?.value || '0', 10),
      email: formRefs.current.email.current?.value || '',
      password: formRefs.current.password.current?.value || '',
      confirmPassword: formRefs.current.confirmPassword.current?.value || '',
      gender: formRefs.current.gender.current?.value || '',
      picture: formRefs.current.picture.current?.files?.[0],
      country: formRefs.current.country.current?.value || '',
      terms: formRefs.current.terms.current?.checked || false,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        const formDataWithImage = {
          ...formData,
          picture: base64String,
        };

        dispatch(setUncontrolledData(formDataWithImage));
      };

      if (formData.picture) {
        reader.readAsDataURL(formData.picture);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          console.error(error.message);
        });
      }
    }
  };

  return (
    <div className={styles.uncontrolled}>
      <CustomForm onSubmit={handleSubmit}>
        {LabelName.map((label) => {
          if (getInputType(label) === 'radio') {
            return (
              <div key={label} className={styles.input_item}>
                <CustomInput
                  ref={formRefs.current[label]}
                  name={label}
                  id="male"
                  type="radio"
                />
                <CustomLabel htmlFor="male">male</CustomLabel>
                <CustomInput
                  ref={formRefs.current[label]}
                  name={label}
                  id="female"
                  type="radio"
                />
                <CustomLabel htmlFor="female">female</CustomLabel>
              </div>
            );
          }

          return (
            <div key={label} className={styles.input_item}>
              <CustomLabel htmlFor={label}>{label}</CustomLabel>
              <CustomInput
                ref={formRefs.current[label]}
                name={label}
                id={label}
                type={getInputType(label)}
              />
            </div>
          );
        })}
        <div className={styles.btn_wrapper}>
          <CustomButton disabled={false}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
