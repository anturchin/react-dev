import { ReactNode, useContext } from 'react';

import { IButtonProps } from './types';
import { ITheme } from '../../../core/context/themeContext/types';
import { ThemeContext } from '../../../core/context/themeContext';

import styles from './Button.module.css';

export const Button = (props: IButtonProps): ReactNode => {
  const { children, onClick, additionalClass } = props;
  const { theme } = useContext<ITheme>(ThemeContext);

  const addClass: string = additionalClass
    ? `${styles['btn']} ${styles[additionalClass]}`
    : `${styles['btn']}`;
  return (
    <button
      role="button"
      className={`${addClass} ${styles[`btn-${theme}-theme`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
