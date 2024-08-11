import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import { ThemeWrapper } from './ThemeWrapper';
import { ThemeContext } from '../../../core/context/themeContext';

const TestComponent = () => {
  const { theme } = useContext(ThemeContext);
  return <div data-testid="test-component" className={theme}></div>;
};

describe('ThemeWrapper', () => {
  test('should apply light theme class when theme is light', () => {
    render(
      <ThemeWrapper>
        <TestComponent />
      </ThemeWrapper>
    );

    const testElement = screen.getByTestId('test-component');
    expect(testElement).toHaveClass('light');
  });

  test('should render children correctly', () => {
    render(
      <ThemeWrapper>
        <div data-testid="child-component">Child Component</div>
      </ThemeWrapper>
    );

    const childElement = screen.getByTestId('child-component');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Component');
  });
});
