import { describe, test, expect } from 'vitest';
import { currentPageSlice, setCurrentPage } from '../currentPageSlice';
import { ICurrentPageState } from '../types';

describe('currentPageSlice', () => {
  const initialState: ICurrentPageState = {
    currentPage: 1,
    results: [],
  };

  test('should handle initial state', () => {
    expect(currentPageSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('should handle setCurrentPage', () => {
    const newState: ICurrentPageState = {
      currentPage: 2,
      results: [
        { id: 1, name: 'Item 1', gender: '', image: '', species: '', type: '' },
      ],
    };
    expect(
      currentPageSlice.reducer(initialState, setCurrentPage(newState))
    ).toEqual(newState);
  });
});
