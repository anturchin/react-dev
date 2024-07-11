import { ReactNode } from 'react';

import { IButtonProps } from './types';

import './Button.css';

export const Button = (props: IButtonProps): ReactNode => {
  const { children, onClick, additionalClass } = props;
  const addClass = additionalClass ? `btn ${additionalClass}` : 'btn';
  return (
    <button className={addClass} onClick={onClick}>
      {children}
    </button>
  );
};
