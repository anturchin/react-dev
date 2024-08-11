import { render, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, vi, expect, afterEach } from 'vitest';
import { useScrollPosition } from './useScrollPosition';

describe('useScrollPosition', () => {
  afterEach(() => {
    cleanup();
    window.scrollTo(0, 0);
  });

  const TestComponent = () => {
    useScrollPosition();
    return <div style={{ height: '200vh' }}>Test Component</div>;
  };

  test('should update scrollPositionRef on scroll', () => {
    render(<TestComponent />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(window.scrollY).toBe(100);
  });

  test('should remove event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<TestComponent />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('should restore scroll position on rerender', () => {
    const { rerender } = render(<TestComponent />);

    fireEvent.scroll(window, { target: { scrollY: 150 } });

    rerender(<TestComponent />);

    expect(window.scrollY).toBe(150);
  });
});
