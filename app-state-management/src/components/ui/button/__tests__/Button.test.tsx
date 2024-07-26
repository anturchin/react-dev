import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('renders button with correct text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(
      <Button onClick={() => {}}>{buttonText}</Button>
    );
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick prop when button is clicked', () => {
    const onClickMock = vi.fn();
    const buttonText = 'Click me';
    const { getByText } = render(
      <Button onClick={onClickMock}>{buttonText}</Button>
    );
    const buttonElement = getByText(buttonText);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('applies additionalClass when provided', () => {
    const additionalClass = 'custom-class';
    const buttonText = 'Click me';
    const { container } = render(
      <Button onClick={() => {}} additionalClass={additionalClass}>
        {buttonText}
      </Button>
    );
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass('btn');
    expect(buttonElement).toHaveClass(additionalClass);
  });
});
