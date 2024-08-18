import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface CustomButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}
