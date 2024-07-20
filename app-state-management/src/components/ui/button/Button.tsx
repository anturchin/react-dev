import { ReactNode, useContext } from 'react';
import { IButtonProps } from './types';
import { ThemeContext } from '../../../core/context/themeContext';

import './Button.css';

export const Button = (props: IButtonProps): ReactNode => {
  const { children, onClick, additionalClass } = props;
  const { theme } = useContext(ThemeContext);

  const addClass = additionalClass ? `btn ${additionalClass}` : 'btn';
  return (
    <button className={`${addClass} btn-${theme}-theme`} onClick={onClick}>
      {children}
    </button>
  );
};
