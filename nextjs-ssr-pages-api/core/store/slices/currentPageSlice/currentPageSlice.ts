import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICurrentPageState } from './types';
import { SearchDataType } from './types';

const initialState: ICurrentPageState = {
  currentPage: 1,
  results: [],
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (
      state,
      action: PayloadAction<{ currentPage: number; results: SearchDataType[] }>
    ) => {
      state.currentPage = action.payload.currentPage;
      state.results = action.payload.results;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;
