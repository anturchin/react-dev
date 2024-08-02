import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { selectedItemsSlice } from './slices';

const makeStore = () => {
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

export const wrapper = createWrapper<AppStore>(makeStore);
