import { ReactNode } from 'react';

import { SwitchTheme } from '../../components/simple/switchTheme/SwitchTheme';
import { ThemeWrapper } from '../../components/smart/themeWrapper/ThemeWrapper';

export const HomeComponent = ({ children }: { children?: ReactNode }) => {
  return (
    <ThemeWrapper>
      <SwitchTheme />
      {children}
    </ThemeWrapper>
  );
};
