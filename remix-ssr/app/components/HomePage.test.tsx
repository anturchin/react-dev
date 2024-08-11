import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { HomeComponent } from '../components/HomePage';

vi.mock('../../components/simple/switchTheme/SwitchTheme', () => ({
  SwitchTheme: () => <div>Mock SwitchTheme</div>,
}));

vi.mock('../../components/smart/themeWrapper/ThemeWrapper', () => ({
  ThemeWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>
      Mock ThemeWrapper
      {children}
    </div>
  ),
}));

describe('HomeComponent', () => {
  test('should render ThemeWrapper and SwitchTheme', () => {
    render(<HomeComponent />);

    expect(screen.getByText('Mock ThemeWrapper')).toBeInTheDocument();
    expect(screen.getByText('Mock SwitchTheme')).toBeInTheDocument();
  });

  test('should render children inside ThemeWrapper', () => {
    render(
      <HomeComponent>
        <div>Test Child</div>
      </HomeComponent>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
