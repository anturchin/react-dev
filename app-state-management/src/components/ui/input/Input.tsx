import { ReactNode, useContext } from 'react';

import { IInputProps } from './types';

import './Input.css';
import { ThemeContext } from '../../../core/context/themeContext';

export const Input = (props: IInputProps): ReactNode => {
  const { onChange, value, placeholder } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <input
      placeholder={placeholder}
      className={`input input-${theme}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};
