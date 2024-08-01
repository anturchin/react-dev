import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRef, useEffect } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

vi.mock('../../ui/button', () => ({
  Button: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>Try Again</button>,
}));

describe('ErrorBoundary', () => {
  test('should catch errors and display error message', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong./)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/)).toBeInTheDocument();
  });

  test('should reset error state on button click', () => {
    const TestComponent = () => {
      const errorBoundaryRef = useRef<ErrorBoundary>(null);

      useEffect(() => {
        if (errorBoundaryRef.current) {
          errorBoundaryRef.current.triggerError();
        }
      }, []);

      return (
        <ErrorBoundary ref={errorBoundaryRef}>
          <div>Test Content</div>
        </ErrorBoundary>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText(/Something went wrong./)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Try Again/));

    expect(screen.queryByText(/Something went wrong./)).not.toBeInTheDocument();
    expect(screen.getByText(/Test Content/)).toBeInTheDocument();
  });
});
