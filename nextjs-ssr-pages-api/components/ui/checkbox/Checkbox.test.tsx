import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, test, expect } from 'vitest';

import { Checkbox } from './Checkbox';
import { ICheckboxProps } from './types';

describe('Checkbox component', () => {
  const handleSelectedItemMock = vi.fn();

  const defaultProps: ICheckboxProps = {
    checked: false,
    resultId: 1,
    handleSelectedItem: handleSelectedItemMock,
  };

  const renderCheckbox = (props: Partial<ICheckboxProps> = {}) => {
    const combinedProps = { ...defaultProps, ...props };
    render(<Checkbox {...combinedProps} />);
  };

  test('renders correctly with given props', () => {
    renderCheckbox();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('id', '1');
  });

  test('changes state when clicked', () => {
    renderCheckbox();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(handleSelectedItemMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleSelectedItem on change', () => {
    renderCheckbox();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });

    expect(handleSelectedItemMock).toHaveBeenCalledTimes(1);
  });

  test('renders correctly when checked', () => {
    renderCheckbox({ checked: true });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});