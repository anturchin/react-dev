import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICurrentPageState } from './types';

const initialState: ICurrentPageState = {
  currentPage: 1,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});
