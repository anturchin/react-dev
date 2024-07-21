import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentPageState, IInfo, IResults } from './types';

const INITIAL_PAGE = 1;

const initialState: ICurrentPageState = {
  results: [],
  info: { count: 0, pages: 0, prev: '', next: '' },
  currentPage: INITIAL_PAGE,
  isLoading: true,
  error: false,
  errorMessage: '',
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    fetchingPage: (state) => {
      state.isLoading = true;
      state.error = false;
      state.errorMessage = '';
    },
    fetchedPage: (
      state,
      action: PayloadAction<{
        results: IResults[];
        info: IInfo;
        currentPage: number;
      }>
    ) => {
      const { results, info, currentPage } = action.payload;
      state.results = results;
      state.info = info;
      state.currentPage = currentPage;
      state.isLoading = false;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.currentPage = action.payload;
    },
  },
});

export const { fetchingPage, fetchedPage, fetchError, changeCurrentPage } =
  currentPageSlice.actions;
