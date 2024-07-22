import { configureStore } from '@reduxjs/toolkit';
import { rickAndMortyApiSlice } from '../slices/rickAndMortyApiSlice/rickAndMortyApiSlice';

export const store = configureStore({
  reducer: {
    [rickAndMortyApiSlice.reducerPath]: rickAndMortyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
