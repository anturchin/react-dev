import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, beforeEach, test, expect } from 'vitest';
import { SearchResults } from '../SearchResults';

describe('SearchResults', () => {
  const resultsMock = [
    { id: 1, name: 'jon snow', gender: 'man', image: 'john.jpg' },
    { id: 2, name: 'jane smith', gender: 'female', image: 'jane.jpg' },
  ];

  const onInfoDetailsClickMock = vi.fn();
  const onResultClickMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders search results', () => {
    render(
      <SearchResults
        results={resultsMock}
        onInfoDetailsClick={onInfoDetailsClickMock}
        onResultClick={onResultClickMock}
      />
    );

    const personNames = resultsMock.map((result) =>
      screen.getByText(result.name)
    );
    expect(personNames.length).toBe(resultsMock.length);
  });

  test('handles a click on the "Info details" button', () => {
    render(
      <SearchResults
        results={resultsMock}
        onInfoDetailsClick={onInfoDetailsClickMock}
        onResultClick={onResultClickMock}
      />
    );

    const infoDetailsButtons = screen.getAllByText('Info details');

    fireEvent.click(infoDetailsButtons[0]);

    expect(onInfoDetailsClickMock).toHaveBeenCalledWith(resultsMock[0].id);
  });

  test('handles a click on the "Info details" button', () => {
    render(
      <SearchResults
        results={resultsMock}
        onInfoDetailsClick={onInfoDetailsClickMock}
        onResultClick={onResultClickMock}
      />
    );

    const resultItem = screen.getByText(resultsMock[0].name);
    fireEvent.click(resultItem);

    expect(onResultClickMock).toHaveBeenCalledTimes(1);
  });
});
