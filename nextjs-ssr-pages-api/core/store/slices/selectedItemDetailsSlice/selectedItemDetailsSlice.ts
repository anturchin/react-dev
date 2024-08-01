import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISelectedItemDetailsState, DetailsCharactersType } from './types';

const initialState: ISelectedItemDetailsState = {
  selectedItemDetails: null,
};

export const selectedItemDetailsSlice = createSlice({
  name: 'selectedItemDetails',
  initialState,
  reducers: {
    setSelectedItemDetails: (state, action: PayloadAction<DetailsCharactersType>) => {
      state.selectedItemDetails = action.payload;
    },
    clearSelectedItemDetails: (state) => {
      state.selectedItemDetails = null;
    },
  },
});

export const { clearSelectedItemDetails, setSelectedItemDetails } =
  selectedItemDetailsSlice.actions;
