import { ReactNode } from 'react';

export interface IButtonProps {
  additionalClass?: string;
  onClick?: () => void;
  children: ReactNode;
}
