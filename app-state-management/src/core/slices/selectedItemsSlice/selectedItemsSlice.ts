import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISelectedItemsState } from './types';

const initialState: ISelectedItemsState = {
  selectedItems: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<number>) => {
      state.selectedItems.push(action.payload);
    },
    deleteSelectedItem: (state, action: PayloadAction<number>) => {
      state.selectedItems = state.selectedItems.filter(
        (id) => id != action.payload
      );
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});
