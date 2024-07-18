import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, beforeEach, test, Mock, expect } from 'vitest';
import { apiService } from '../../../core/services/apiService';
import { SearchContainer } from '../SearchContainer';

vi.mock('../../../core/services/apiService');
vi.mock('../../../core/utils/delay/delay', () => ({
  delay: vi.fn().mockResolvedValue(undefined),
}));

const mockResults = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/rick.png',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/morty.png',
  },
];

const mockInfo = {
  count: 2,
  pages: 1,
  next: '',
  prev: '',
};

describe('SearchContainer', () => {
  const renderComponent = (route: string) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/search/:page" element={<SearchContainer />} />
          <Route
            path="/search/:page/details/:id"
            element={<div>Details Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays search results after API call', async () => {
    (apiService.fetchSearchResults as Mock).mockResolvedValue({
      results: mockResults,
      info: mockInfo,
    });

    renderComponent('/search/1');

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });
});
