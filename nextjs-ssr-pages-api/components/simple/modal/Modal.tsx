import { ReactNode, useContext } from 'react';

import { ThemeContext } from '@/core/context/themeContext';
import { ITheme } from '@/core/context/themeContext/types';

import './Modal.css';

export const Modal = ({
  deselectItems,
  filename,
  blob,
  count = 0,
}: {
  deselectItems: () => void;
  filename: string;
  blob: Blob;
  count: number;
}): ReactNode => {
  const { theme } = useContext<ITheme>(ThemeContext);

  return (
    <div role="dialog" className={`modal modal-theme-${theme}`}>
      <p className="modal-content">Selected items: {count}</p>
      <div className="modal-btn">
        <button
          onClick={deselectItems}
          className={`btn red modal-btn-${theme}`}
        >
          deselect all
        </button>
        <a
          href={URL.createObjectURL(blob)}
          download={filename}
          className={`btn modal-btn-${theme}`}
        >
          load
        </a>
      </div>
    </div>
  );
};