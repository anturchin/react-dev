import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './form.slice.ts';
import { countriesSlice } from './countries.slice.ts';

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
