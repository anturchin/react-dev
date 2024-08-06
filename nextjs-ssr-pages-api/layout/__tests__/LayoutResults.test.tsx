import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { LayoutResults } from '../LayoutResults';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('LayoutResults', () => {
  test('should render SwitchTheme and SearchContainer', () => {
    const initialProps = {
      results: [],
      currentPage: 1,
      pages: 1,
      isError: false,
    };

    render(<LayoutResults {...initialProps} />);

    expect(screen.getByTestId('switch-theme')).toBeInTheDocument();
  });
});
