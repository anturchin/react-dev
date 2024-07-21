import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDetails, IDetailsState } from './types';

const initialState: IDetailsState = {
  details: null,
  isLoading: true,
  error: false,
  errorMessage: '',
};

export const detailsPageSlice = createSlice({
  name: 'detailsPage',
  initialState,
  reducers: {
    fetchingDetailPage: (state) => {
      state.details = null;
      state.isLoading = true;
      state.error = false;
      state.errorMessage = '';
    },
    fetchedDetailPage: (
      state,
      payload: PayloadAction<{ details: IDetails }>
    ) => {
      state.details = payload.payload.details;
      state.isLoading = false;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchError, fetchedDetailPage, fetchingDetailPage } =
  detailsPageSlice.actions;
