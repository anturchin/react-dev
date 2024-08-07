import { ChangeEvent, ReactNode } from 'react';

export interface ICheckboxProps {
  resultId: number;
  checked?: boolean;
  children?: ReactNode;
  handleSelectedItem: (e: ChangeEvent<HTMLInputElement>) => void;
}
