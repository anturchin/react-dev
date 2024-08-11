import { describe, test, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from '@remix-run/react';

import { SearchDetails } from './SearchDetails';

vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn(),
}));

const mockNavigate = vi.fn();

const character = {
  id: 361,
  name: 'Toxic Rick',
  status: 'Dead',
  species: 'Humanoid',
  type: "Rick's Toxic Side",
  gender: 'Male',
  origin: {
    name: 'Alien Spa',
    url: 'https://rickandmortyapi.com/api/location/64',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/27'],
  url: 'https://rickandmortyapi.com/api/character/361',
  created: '2018-01-10T18:20:41.703Z',
};

describe('SearchDetails', () => {
  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  test('should render SearchError when isError is true', () => {
    render(<SearchDetails isError={true} character={null} currentPage={1} />);

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  test('should render character details when isError is false', () => {
    render(<SearchDetails isError={false} character={character} currentPage={1} />);

    expect(screen.getByText('Toxic Rick')).toBeInTheDocument();
    expect(screen.getByText('Status: Dead')).toBeInTheDocument();
    expect(screen.getByText('Species: Humanoid')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByAltText('Toxic Rick')).toBeInTheDocument();
  });

  test('should navigate back to the current page when Close button is clicked', async () => {
    render(<SearchDetails isError={false} character={character} currentPage={1} />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Close'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
