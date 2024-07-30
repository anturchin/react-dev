import { ReactNode, useContext } from 'react';

import { IInputProps } from './types';
import { ThemeContext } from '../../../core/context/themeContext';
import { ITheme } from '../../../core/context/themeContext/types';

import styles from './Input.module.css';

export const Input = (props: IInputProps): ReactNode => {
  const { onChange, value, placeholder } = props;
  const { theme } = useContext<ITheme>(ThemeContext);

  return (
    <input
      placeholder={placeholder}
      className={`${styles["input"]} ${styles[`input-${theme}`]}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};