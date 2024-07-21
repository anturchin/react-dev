import { configureStore } from '@reduxjs/toolkit';
import { currentPageSlice } from '../slices/currentPageSlice';

export const store = configureStore({
  reducer: {
    currentPage: currentPageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
