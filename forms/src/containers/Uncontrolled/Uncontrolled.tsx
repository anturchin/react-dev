import { createRef, FormEvent, RefObject, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  CustomButton,
  CustomForm,
  CustomInput,
  CustomLabel,
} from '../../components';
import { validationSchema } from '../../validation/validation.schema.ts';
import { setUncontrolledData } from '../../store';
import { AppDispatch, RootState } from '../../store/store.ts';
import { GENDER } from './Uncontrolled.props.ts';
import { CustomSelect } from '../../components';
import { LabelName } from '../../constants/labelName.ts';

import styles from './Uncontrolled.module.css';

export const Uncontrolled = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries);
  const [errorMap, setErrorMap] = useState<Record<string, string> | null>(null);

  const formRefs = useRef<{ [key: string]: RefObject<HTMLInputElement> }>({
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

  const optionRef = useRef<{ [key: string]: RefObject<HTMLSelectElement> }>({
    country: createRef(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedGender = () => {
      return formRefs.current.male.current?.checked
        ? GENDER.MALE
        : formRefs.current.female.current?.checked
          ? GENDER.FEMALE
          : ('' as GENDER);
    };

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

      setErrorMap(null);

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

  const generateInputRadio = (label: string) => {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <CustomInput
            ref={formRefs.current[GENDER.MALE]}
            name={label}
            id={GENDER.MALE}
            type="radio"
          />
          <CustomLabel htmlFor={GENDER.MALE}>male</CustomLabel>
          <CustomInput
            ref={formRefs.current[GENDER.FEMALE]}
            name={label}
            id={GENDER.FEMALE}
            type="radio"
          />
          <CustomLabel htmlFor={GENDER.FEMALE}>female</CustomLabel>
        </div>
        {errorMap && errorMap.gender && (
          <p className={styles.errors}>{errorMap.gender}</p>
        )}
      </div>
    );
  };

  const generateInput = (
    label: string,
    type: 'file' | 'text' | 'checkbox' = 'text'
  ) => {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <CustomLabel htmlFor={label}>{label}</CustomLabel>
          <CustomInput
            ref={formRefs.current[label]}
            name={label}
            id={label}
            type={type}
          />
        </div>
        {errorMap && errorMap[label] && (
          <p className={styles.errors}>{errorMap[label]}</p>
        )}
      </div>
    );
  };

  const generateOptions = (label: string) => {
    return (
      <div key={label} className={styles.wrapper}>
        <div className={styles.input_item}>
          <CustomLabel htmlFor={label}>{label}</CustomLabel>
          <CustomSelect ref={optionRef.current[label]} name={label} id={label}>
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

  return (
    <div className={styles.uncontrolled}>
      <CustomForm onSubmit={handleSubmit}>
        {LabelName.map((label) => {
          if (label === 'gender') {
            return generateInputRadio(label);
          }

          if (label === 'country') {
            return generateOptions(label);
          }

          if (label === 'picture') {
            return generateInput(label, 'file');
          }

          if (label === 'terms') {
            return generateInput(label, 'checkbox');
          }

          return generateInput(label);
        })}
        <div className={styles.btn_wrapper}>
          <CustomButton disabled={false}>Submit</CustomButton>
        </div>
      </CustomForm>
    </div>
  );
};
