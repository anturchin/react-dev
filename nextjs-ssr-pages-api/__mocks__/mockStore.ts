import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsSlice } from '@/core/store/slices';

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      [selectedItemsSlice.name]: selectedItemsSlice.reducer,
    },
    preloadedState: initialState,
  });
};
