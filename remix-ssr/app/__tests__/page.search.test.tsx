import { describe, test, expect, vi, Mock } from 'vitest';
import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useLoaderData } from '@remix-run/react';

import SearchPage from '../routes/page.search';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual<typeof import('@remix-run/react')>('@remix-run/react');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

vi.mock('../components/HomePage', () => ({
  HomeComponent: ({ children }: { children: ReactNode }) => (
    <div data-testid="home-component">{children}</div>
  ),
}));

vi.mock('../../components/smart/searchContainer/SearchContainer', () => ({
  SearchContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="search-container">{children}</div>
  ),
}));

describe('SearchPage Component', () => {
  test('should render HomeComponent and SearchContainer with the correct data', () => {
    const mockData = { results: ['Result 1', 'Result 2'] };

    (useLoaderData as Mock).mockReturnValue(mockData);

    render(<SearchPage />);

    expect(screen.getByTestId('home-component')).toBeInTheDocument();
    expect(screen.getByTestId('search-container')).toBeInTheDocument();
  });
});
