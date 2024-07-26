import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeContext } from '../../core/context/themeContext';
import { store } from '../../core/store';
import { Theme } from '../../core/context/themeContext/types';
import { SearchPage } from '../../pages/searchPage';
import { NotFound } from '../../pages/404';
import { SearchDetails } from '../../components/smart/searchDetail';

const themeContextValue = {
  theme: 'light' as Theme,
  handleChangeTheme: vi.fn(),
};

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeContext.Provider value={themeContextValue}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="search/:page" element={<SearchPage />}>
              <Route path="details/:id" element={<SearchDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeContext.Provider>
      </MemoryRouter>
    </Provider>
  );
};

describe('Router', () => {
  it('should render SearchPage for / route', () => {
    renderWithRouter(['/']);
    expect(screen.getByText(/The Rick and Morty API/i)).toBeInTheDocument();
  });

  it('should render NotFound for unknown routes', () => {
    renderWithRouter(['/unknown-route']);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('should render SearchDetails for /search/:page/details/:id route', () => {
    renderWithRouter(['/search/1/details/123']);
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
