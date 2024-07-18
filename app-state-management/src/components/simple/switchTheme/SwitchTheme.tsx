import { ReactNode } from 'react';

import './SwitchTheme.css';

export const SwitchTheme = (): ReactNode => {
  return (
    <div className="toggle-switch">
      <label className="label">
        <input className="input-checkbox" type="checkbox" />
        <span className="slider" />
      </label>
    </div>
  );
};
