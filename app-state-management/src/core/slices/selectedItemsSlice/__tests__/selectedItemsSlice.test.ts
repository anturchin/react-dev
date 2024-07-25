import { describe, test, expect } from 'vitest';
import { ResultPropType } from '../../../../components/smart/searchResults/types';
import {
  selectedItemsSlice,
  setSelectedItem,
  deleteSelectedItem,
  clearSelectedItems,
} from '../selectedItemsSlice';

describe('selectedItemsSlice', () => {
  const initialState = {
    selectedItems: [],
  };

  test('should handle initial state', () => {
    expect(selectedItemsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('should handle setSelectedItem', () => {
    const newItem: ResultPropType = {
      id: 1,
      name: 'Item 1',
      gender: '',
      image: '',
    };
    expect(
      selectedItemsSlice.reducer(initialState, setSelectedItem(newItem))
    ).toEqual({ selectedItems: [newItem] });
  });

  test('should handle deleteSelectedItem', () => {
    const initialStateWithItem = {
      selectedItems: [{ id: 1, name: 'Item 1', gender: '', image: '' }],
    };
    expect(
      selectedItemsSlice.reducer(
        initialStateWithItem,
        deleteSelectedItem({ id: 1, name: 'Item 1', gender: '', image: '' })
      )
    ).toEqual({ selectedItems: [] });
  });

  test('should handle clearSelectedItems', () => {
    const initialStateWithItems = {
      selectedItems: [{ id: 1, name: 'Item 1', gender: '', image: '' }],
    };
    expect(
      selectedItemsSlice.reducer(initialStateWithItems, clearSelectedItems())
    ).toEqual({ selectedItems: [] });
  });
});
