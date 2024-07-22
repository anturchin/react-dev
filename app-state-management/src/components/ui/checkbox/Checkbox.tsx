import { ChangeEvent, ReactNode } from 'react';

import { ICheckboxProps } from './types';

import './Checkbox.css';

export const Checkbox = ({
  resultId,
  handleSelectedItem,
}: ICheckboxProps): ReactNode => {
  return (
    <div className="checkbox-wrapper-19">
      <input
        type="checkbox"
        id={`${resultId}`}
        // checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectedItem(e)}
      />
      <label htmlFor={`${resultId}`} className="check-box" />
    </div>
  );
};
