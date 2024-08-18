export interface ControlledForm {
  name: string;
  age: string;
  male: string;
  female: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  picture: string;
  terms: boolean;
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
