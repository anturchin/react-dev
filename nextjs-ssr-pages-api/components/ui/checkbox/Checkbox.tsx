import { ChangeEvent } from 'react';

import { ICheckboxProps } from './types';

import styles from './Checkbox.module.css';

export const Checkbox = ({
  checked,
  resultId,
  handleSelectedItem,
}: ICheckboxProps): JSX.Element => {
  return (
    <div className={`${styles['checkbox-wrapper']}`}>
      <input
        type="checkbox"
        id={`${resultId}`}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectedItem(e)}
      />
      <label htmlFor={`${resultId}`} className={`${styles['check-box']}`} />
    </div>
  );
};
