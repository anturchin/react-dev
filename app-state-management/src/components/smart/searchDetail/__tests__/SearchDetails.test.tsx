import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, beforeEach, test, Mock, expect } from 'vitest';
import { apiService } from '../../../../core/services/apiService';
import { SearchDetails } from '../SearchDetails';

vi.mock('../../../../core/services/apiService');
vi.mock('../../../../utils/delay/delay', () => ({
  delay: vi.fn().mockResolvedValue(undefined),
}));

const mockDetails = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://example.com/rick.png',
};

describe('SearchDetails', () => {
  const renderComponent = (route: string) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/search/:page" element={<div>Search Page</div>} />
          <Route path="/search/:page/details/:id" element={<SearchDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('navigates back to search page on close button click', async () => {
    (apiService.fetchSearchDetails as Mock).mockResolvedValue(mockDetails);

    renderComponent('/search/1/details/1');

    await waitFor(
      () => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.getByText(/search page/i)).toBeInTheDocument();
    });
  });
});
