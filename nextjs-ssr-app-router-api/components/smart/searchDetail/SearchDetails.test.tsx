import { describe, test, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { SearchDetails } from './SearchDetails';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: Record<string, string>) => <img src={src} alt={alt} />,
}));

const mockRouter = {
  push: vi.fn(),
};

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
    (useRouter as Mock).mockReturnValue(mockRouter);
  });

  test('should render SearchError when isError is true', () => {
    render(<SearchDetails isError={true} character={null} />);

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

    expect(mockRouter.push).toHaveBeenCalledWith('/page/1', { scroll: false });
  });
});
