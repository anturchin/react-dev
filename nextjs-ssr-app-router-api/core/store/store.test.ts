import { describe, beforeEach, test, expect } from 'vitest';

import { selectedItemsSlice } from './slices';
import { AppStore, makeStore } from './store';

describe('Redux Store', () => {
  let store: AppStore;

  beforeEach(() => {
    store = makeStore();
  });

  test('should configure store with selectedItemsSlice', () => {
    expect(store.getState().selectedItems).toBeDefined();
  });

  test('should dispatch an action and update state', () => {
    const action = selectedItemsSlice.actions.setSelectedItem({
      id: 1,
      name: 'Test Item',
      image: '',
      gender: '',
    });

    store.dispatch(action);

    const state = store.getState();
    expect(state.selectedItems.selectedItems).toContainEqual({
      id: 1,
      name: 'Test Item',
      image: '',
      gender: '',
    });
  });
});
