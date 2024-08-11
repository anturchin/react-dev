import { ReactNode } from 'react';

import { SwitchTheme } from '../../components/simple/switchTheme';
import { ThemeWrapper } from '../../components/smart/themeWrapper';

export const HomeComponent = ({ children }: { children?: ReactNode }) => {
  return (
    <ThemeWrapper>
      <SwitchTheme />
      {children}
    </ThemeWrapper>
  );
};
