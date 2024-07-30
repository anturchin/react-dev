import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  test('calls onChange callback when input value changes', () => {
    const onChange = vi.fn();
    const { container } = render(<Input onChange={onChange} value="" />);

    const inputElement = container.querySelector('input') as HTMLInputElement;
    const newValue = 'New value';

    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});