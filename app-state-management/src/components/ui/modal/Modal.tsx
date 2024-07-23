import { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../../core/context/themeContext';
import { ITheme } from '../../../core/context/themeContext/types';

import './Modal.css';

export const Modal = ({
  onClick,
  count = 0,
}: {
  onClick: () => void;
  count: number;
}): ReactNode => {
  const { theme } = useContext<ITheme>(ThemeContext);

  return (
    <div className={`modal modal-theme-${theme}`}>
      <p className="modal-content">Selected items: {count}</p>
      <div className="modal-btn">
        <button onClick={onClick} className={`btn red modal-btn-${theme}`}>
          deselect all
        </button>
        <button className={`btn modal-btn-${theme}`}>load</button>
      </div>
    </div>
  );
};
