import { configureStore } from '@reduxjs/toolkit';

import { rickAndMortyApiSlice } from '../slices/rickAndMortyApiSlice/rickAndMortyApiSlice';
import { selectedItemsSlice } from '../slices/selectedItemsSlice';
import { currentPageSlice } from '../slices/currentPageSlice';
import { selectedItemDetailsSlice } from '../slices/selectedItemDetailsSlice';
import { localStorageService } from '../services/localStorageService/localStorageService';
import { LsKey } from '../services/localStorageService/types';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
    currentPage: currentPageSlice.reducer,
    selectedItemDetails: selectedItemDetailsSlice.reducer,
    [rickAndMortyApiSlice.reducerPath]: rickAndMortyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApiSlice.middleware),
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
