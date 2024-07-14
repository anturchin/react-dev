import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SearchError } from '../SearchError';
import { ErrorTypeProps } from '../types';

describe('SearchError', () => {
  it('should render the error message', () => {
    const errorMessage = 'Something went wrong';
    const props: ErrorTypeProps = { message: errorMessage };

    render(<SearchError {...props} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('search-error');
  });
});
