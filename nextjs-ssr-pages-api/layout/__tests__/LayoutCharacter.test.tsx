import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { LayoutCharacter } from '../LayoutCharacter';
import { CharacterProps } from '../types';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('LayoutCharacter', () => {
  test('should render SwitchTheme, SearchContainer, and SearchDetails', () => {
    const searchResults = {
      results: [],
      currentPage: 1,
      pages: 1,
      isError: false,
    };

    const characterDetails = {
      character: {
        image: '',
        name: '',
        status: '',
        species: '',
        gender: '',
      },
      isError: false,
      currentPage: 1,
    } as unknown as CharacterProps;

    render(<LayoutCharacter searchResults={searchResults} characterDetails={characterDetails} />);

    expect(screen.getByTestId('switch-theme')).toBeInTheDocument();
  });
});
