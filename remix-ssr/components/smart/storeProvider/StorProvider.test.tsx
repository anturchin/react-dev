import { render } from '@testing-library/react';
import { vi, describe, test, beforeEach, Mock, expect } from 'vitest';

import { localStorageService } from '../../../core/services/localStorageService';
import { LsKey } from '../../../core/services/localStorageService/types';
import { makeStore } from '../../../core/store/store';
import { StoreProvider } from './StorProvider';

vi.mock('../../../core/store/store', () => ({
  makeStore: vi.fn(),
}));

vi.mock('../../../core/services/localStorageService', () => ({
  localStorageService: {
    saveQuery: vi.fn(),
  },
}));

const mockStore = {
  subscribe: vi.fn(),
  getState: vi.fn(),
};

const mockState = {
  selectedItems: {
    selectedItems: ['item1', 'item2'],
  },
};

describe('StoreProvider', () => {
  beforeEach(() => {
    (makeStore as Mock).mockReturnValue(mockStore);
    mockStore.getState.mockReturnValue(mockState);
  });

  test('should call localStorageService.saveQuery when store state changes', () => {
    render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>
    );

    const callback = mockStore.subscribe.mock.calls[0][0];
    callback();

    expect(localStorageService.saveQuery).toHaveBeenCalledWith(
      LsKey.SELECTED_ITEMS,
      JSON.stringify(mockState.selectedItems.selectedItems)
    );
  });

  test('should provide store to child components', () => {
    const { getByText } = render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
