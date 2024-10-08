import { useContext } from 'react';

import { ThemeContext } from '@/core/context/themeContext';
import { ITheme } from '@/core/context/themeContext/types';

import styles from './Modal.module.css';

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
}): JSX.Element => {
  const { theme } = useContext<ITheme>(ThemeContext);

  return (
    <div role="dialog" className={`${styles['modal']} ${styles[`modal-theme-${theme}`]}`}>
      <p className={`${styles['modal-content']}`}>Selected items: {count}</p>
      <div className={`${styles['modal-btn']}`}>
        <button
          onClick={deselectItems}
          className={`${styles['btn']} ${styles[`btn-${theme}`]} ${styles['red']}`}
        >
          deselect all
        </button>
        <a
          href={URL.createObjectURL(blob)}
          download={filename}
          className={`${styles['btn']} ${styles[`btn-${theme}`]}`}
        >
          load
        </a>
      </div>
    </div>
  );
};
