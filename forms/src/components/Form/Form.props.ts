import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';

export interface CustomFormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  onSubmit: () => void;
  children: ReactNode;
}
