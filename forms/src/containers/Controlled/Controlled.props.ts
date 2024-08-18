import { PictureValue } from '../../validation/validation.schema.ts';
import { Maybe } from 'yup';

export interface ControlledForm {
  name: string;
  age: string;
  male?: Maybe<string | undefined>;
  female?: Maybe<string | undefined>;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  picture: PictureValue;
  terms?: boolean | undefined;
  gender: string;
}

export type Label =
  | 'name'
  | 'age'
  | 'male'
  | 'female'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'country'
  | 'picture'
  | 'terms'
  | 'gender';
