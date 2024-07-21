import { configureStore } from '@reduxjs/toolkit';
import { currentPageSlice } from '../slices/currentPageSlice';
import { detailsPageSlice } from '../slices/detailPageSlice';

export const store = configureStore({
  reducer: {
    currentPage: currentPageSlice.reducer,
    detailsPage: detailsPageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
