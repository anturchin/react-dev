import { ReactNode } from 'react';

export interface IButtonProps {
  additionalClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
