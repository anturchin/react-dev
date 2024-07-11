import { ReactNode } from 'react';

import { IInputProps } from './types';

import './Input.css';

export const Input = (props: IInputProps): ReactNode => {
  const { onChange, value, placeholder } = props;
  return (
    <input
      placeholder={placeholder}
      className="input"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};
