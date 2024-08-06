import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, test, expect, beforeEach, afterEach, Mock } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import { SearchResults } from './SearchResults';
import { Theme } from '@/core/context/themeContext/types';
import { ThemeContext } from '@/core/context/themeContext';
import { clearSelectedItems } from '@/core/store/slices';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe('SearchResults component', () => {
  const mockDispatch = vi.fn();
  const mockOnInfoDetailsClick = vi.fn();
  const mockOnResultClick = vi.fn();
  const theme = 'light' as Theme;

  const mockResults = [
    {
      id: 1,
      name: 'Rick Sanchez',
      gender: 'Male',
      image: 'https://example.com/rick.jpg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      gender: 'Male',
      image: 'https://example.com/morty.jpg',
    },
  ];

  const mockSelectedItems = [
    {
      id: 1,
      name: 'Rick Sanchez',
      gender: 'Male',
      image: 'https://example.com/rick.jpg',
    },
  ];

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        selectedItems: { selectedItems: mockSelectedItems },
      })
    );

    global.URL.createObjectURL = vi.fn(() => 'mock-url');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ThemeContext.Provider value={{ theme, handleChangeTheme: vi.fn() }}>
        <SearchResults
          results={mockResults}
          onInfoDetailsClick={mockOnInfoDetailsClick}
          onResultClick={mockOnResultClick}
        />
      </ThemeContext.Provider>
    );
  };

  test('renders results correctly', () => {
    renderComponent();

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByText('Male')).toHaveLength(2);
  });

  test('calls onInfoDetailsClick when Info details button is clicked', () => {
    renderComponent();

    const infoButtons = screen.getAllByRole('button', {
      name: /info details/i,
    });
    expect(infoButtons.length).toBeGreaterThan(0);

    fireEvent.click(infoButtons[0]);
    expect(mockOnInfoDetailsClick).toHaveBeenCalledWith(1);
  });

  test('calls onResultClick when search results container is clicked', () => {
    renderComponent();

    const searchResultsContainer = screen.getAllByRole('button', {
      name: /info details/i,
    })[0].parentElement;
    if (searchResultsContainer) {
      fireEvent.click(searchResultsContainer);
      expect(mockOnResultClick).toHaveBeenCalled();
    }
  });

  test('renders modal with selected items', () => {
    renderComponent();

    const modals = screen.queryAllByRole('dialog');
    expect(modals.length).toBeGreaterThan(0);
  });

  test('deselects items correctly', () => {
    renderComponent();

    const deselectButton = screen.getByRole('button', {
      name: /deselect all/i,
    });
    fireEvent.click(deselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedItems());
  });
});
