import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISelectedItemsState } from './types';
import { localStorageService } from '@/core/services/localStorageService';
import { LsKey } from '@/core/services/localStorageService/types';
import { ResultPropType } from '@/components/smart/searchResults/types';

let items: ResultPropType[] = [];

try {
  const itemsFromLs = JSON.parse(
    localStorageService.getQuery?.(LsKey.SELECTED_ITEMS) as string
  ) as ResultPropType[];
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
    setSelectedItem: (state, action: PayloadAction<ResultPropType>) => {
      state.selectedItems.push(action.payload);
    },
    deleteSelectedItem: (state, action: PayloadAction<ResultPropType>) => {
      state.selectedItems = state.selectedItems.filter((item) => item.id != action.payload.id);
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { setSelectedItem, deleteSelectedItem, clearSelectedItems } =
  selectedItemsSlice.actions;
