import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  describe,
  vi,
  test,
  expect,
  afterEach,
  beforeEach,
  Mock,
} from 'vitest';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SearchDetails } from '../SearchDetails';
import { useFetchSearchDetailsQuery } from '../../../../core/slices/rickAndMortyApiSlice';
import { FAILED_TO_FETCH } from '../../../../core/constants';
import { setSelectedItemDetails } from '../../../../core/slices/selectedItemDetailsSlice';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../../../core/slices/rickAndMortyApiSlice', () => ({
  useFetchSearchDetailsQuery: vi.fn(),
}));

describe('SearchDetails component', () => {
  const navigateMock = vi.fn();
  const dispatchMock = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(navigateMock);
    (useParams as Mock).mockReturnValue({ id: '1', page: '1' });
    (useDispatch as unknown as Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading spinner while fetching data', () => {
    (useFetchSearchDetailsQuery as Mock).mockReturnValue({
      data: null,
      isError: false,
      isFetching: true,
    });

    render(<SearchDetails />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    (useFetchSearchDetailsQuery as Mock).mockReturnValue({
      data: null,
      isError: true,
      isFetching: false,
    });

    render(<SearchDetails />);

    expect(screen.getByText(FAILED_TO_FETCH)).toBeInTheDocument();
  });

  test('renders data correctly after successful fetch', async () => {
    const mockData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/image.jpg',
    };

    (useFetchSearchDetailsQuery as Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isFetching: false,
    });

    render(<SearchDetails />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockData.status}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Species: ${mockData.species}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${mockData.gender}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockData.name)).toHaveAttribute(
      'src',
      mockData.image
    );
  });

  test('calls navigate function when close button is clicked', async () => {
    const mockData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/image.jpg',
    };

    (useFetchSearchDetailsQuery as Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isFetching: false,
    });

    render(<SearchDetails />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(navigateMock).toHaveBeenCalledWith('/search/1');
  });

  test('dispatches setSelectedItemDetails with fetched data', async () => {
    const mockData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/image.jpg',
      type: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      episode: [''],
      url: '',
      created: '',
    };

    (useFetchSearchDetailsQuery as Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isFetching: false,
    });

    render(<SearchDetails />);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        setSelectedItemDetails(mockData)
      );
    });
  });
});
