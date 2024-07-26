import { vi, describe, test, expect, Mock } from 'vitest';
import { store } from '../store';
import { selectedItemsSlice } from '../../slices/selectedItemsSlice';
import { localStorageService } from '../../services/localStorageService/localStorageService';
import { LsKey } from '../../services/localStorageService/types';

vi.mock('../../services/localStorageService/localStorageService', () => ({
  localStorageService: {
    saveQuery: vi.fn(),
  },
}));

describe('Redux Store', () => {
  test('should save selected items to localStorage on state change', () => {
    (localStorageService.saveQuery as Mock).mockClear();

    store.dispatch(
      selectedItemsSlice.actions.setSelectedItem({
        id: 1,
        name: 'Item 1',
        gender: '',
        image: '',
      })
    );
    expect(localStorageService.saveQuery).toHaveBeenCalledWith(
      LsKey.SELECTED_ITEMS,
      JSON.stringify([{ id: 1, name: 'Item 1', gender: '', image: '' }])
    );
  });
});
