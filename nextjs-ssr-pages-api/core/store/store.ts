import { configureStore } from '@reduxjs/toolkit';

import { selectedItemsSlice } from './slices/selectedItemsSlice';
import { currentPageSlice } from './slices/currentPageSlice';
import { selectedItemDetailsSlice } from './slices/selectedItemDetailsSlice';
import { localStorageService } from '@/core/services/localStorageService';
import { LsKey } from '@/core/services/localStorageService/types';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
    currentPage: currentPageSlice.reducer,
    selectedItemDetails: selectedItemDetailsSlice.reducer,
  },
});

store.subscribe(() => {
  const { selectedItems } = store.getState();
  localStorageService.saveQuery?.(
    LsKey.SELECTED_ITEMS,
    JSON.stringify(selectedItems.selectedItems)
  );
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
