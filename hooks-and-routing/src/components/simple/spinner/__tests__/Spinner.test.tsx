import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  test('renders spinner component', () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector('.spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
