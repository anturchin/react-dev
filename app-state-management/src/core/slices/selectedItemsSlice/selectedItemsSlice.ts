import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISelectedItemsState } from './types';
import { localStorageService } from '../../services/localStorageService/localStorageService';
import { LsKey } from '../../services/localStorageService/types';

let items: number[] = [];

try {
  const itemsFromLs = JSON.parse(
    localStorageService.getQuery?.(LsKey.SELECTED_ITEMS) as string
  ) as number[];
  if (itemsFromLs && Array.isArray(itemsFromLs)) items = itemsFromLs;
} catch (error) {
  if (error instanceof Error) console.error(error.message);
}

const initialState: ISelectedItemsState = {
  selectedItems: items,
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
