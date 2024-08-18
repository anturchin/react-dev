import { createRef, FormEvent, RefObject, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomForm } from '../../components';
import { validationSchema } from '../../validation/validation.schema.ts';
import { setUncontrolledData } from '../../store';
import { AppDispatch, RootState } from '../../store/store.ts';
import { GENDER, RefInput, RefOption } from './Uncontrolled.props.ts';
import { labelName } from '../../constants/labelName.ts';
import { renderInput } from '../../helpers';

import styles from './Uncontrolled.module.css';

export const Uncontrolled = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries);
  const [errorMap, setErrorMap] = useState<Record<string, string> | undefined>(
    undefined
  );

  const formRefs: RefInput = useRef<{
    [key: string]: RefObject<HTMLInputElement>;
  }>({
    name: createRef(),
    age: createRef(),
    email: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
    male: createRef(),
    female: createRef(),
    picture: createRef(),
    terms: createRef(),
  });

  const optionRef: RefOption = useRef<{
    [key: string]: RefObject<HTMLSelectElement>;
  }>({
    country: createRef(),
  });

  const selectedGender = () => {
    return formRefs.current.male.current?.checked
      ? GENDER.MALE
      : formRefs.current.female.current?.checked
        ? GENDER.FEMALE
        : ('' as GENDER);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: formRefs.current.name.current?.value || '',
      age: parseInt(formRefs.current.age.current?.value || '0', 10),
      email: formRefs.current.email.current?.value || '',
      password: formRefs.current.password.current?.value || '',
      confirmPassword: formRefs.current.confirmPassword.current?.value || '',
      gender: selectedGender(),
      picture: formRefs.current.picture.current?.files?.[0],
      country: optionRef.current.country.current?.value || '',
      terms: formRefs.current.terms.current?.checked || false,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      setErrorMap(undefined);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        const formDataWithImage = {
          ...formData,
          picture: base64String,
        };

        dispatch(setUncontrolledData(formDataWithImage));
        navigate('/');
      };

      if (formData.picture) {
        reader.readAsDataURL(formData.picture);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          errors[error.path as string] = error.message;
        });
        setErrorMap(errors);
      }
    }
  };

  return (
    <div className={styles.uncontrolled}>
      <CustomForm onSubmit={handleSubmit}>
        {labelName.map((label) =>
          renderInput({ label, countries, errorMap, formRefs, optionRef })
        )}
        <div className={styles.btn_wrapper}>
          <CustomButton disabled={false}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
