import { describe, test, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { SearchDetails } from './SearchDetails';
import { createMockStore } from '@/__mocks__/mockStore';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: Record<string, string>) => <img src={src} alt={alt} />,
}));

const mockRouter = {
  push: vi.fn(),
  query: {},
  isFallback: false,
  asPath: '',
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

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
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

    fireEvent.click(screen.getByText('Close'));

    expect(mockRouter.push).toHaveBeenCalledWith('/page/1');
  });
});
