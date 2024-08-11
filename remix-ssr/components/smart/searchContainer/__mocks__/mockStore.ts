import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsSlice } from '../../../../core/store';

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      [selectedItemsSlice.name]: selectedItemsSlice.reducer,
    },
    preloadedState: initialState,
  });
};
