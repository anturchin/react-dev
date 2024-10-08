import { configureStore } from '@reduxjs/toolkit';

import { selectedItemsSlice } from './slices';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [selectedItemsSlice.name]: selectedItemsSlice.reducer,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
