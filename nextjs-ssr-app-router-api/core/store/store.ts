import { configureStore } from '@reduxjs/toolkit';

import { selectedItemsSlice } from './slices';
import { localStorageService } from '../services/localStorageService';
import { LsKey } from '../services/localStorageService/types';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [selectedItemsSlice.name]: selectedItemsSlice.reducer,
    },
    devTools: true,
  });
};

makeStore().subscribe(() => {
  const { selectedItems } = makeStore().getState();
  localStorageService.saveQuery?.(
    LsKey.SELECTED_ITEMS,
    JSON.stringify(selectedItems.selectedItems)
  );
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
