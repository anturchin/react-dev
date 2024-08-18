import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react';

export interface CustomLabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  children: ReactNode;
}
