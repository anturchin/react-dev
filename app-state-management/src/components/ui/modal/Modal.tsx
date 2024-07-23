import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../../core/context/themeContext';

import './Modal.css';

export const Modal = ({ count = 0 }: { count: number }): ReactNode => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`modal modal-theme-${theme}`}>
      <p className="modal-content">Selected items: {count}</p>
      <div className="modal-btn">
        <button className={`btn red modal-btn-${theme}`}>Cancel</button>
        <button className={`btn modal-btn-${theme}`}>Download</button>
      </div>
    </div>
  );
};
