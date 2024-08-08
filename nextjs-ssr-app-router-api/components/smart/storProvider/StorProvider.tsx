'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { localStorageService } from '@/core/services/localStorageService';
import { LsKey } from '@/core/services/localStorageService/types';
import { makeStore } from '@/core/store';
import { AppStore } from '@/core/store/store';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.subscribe(() => {
      const { selectedItems } = storeRef.current!.getState();
      localStorageService.saveQuery(
        LsKey.SELECTED_ITEMS,
        JSON.stringify(selectedItems.selectedItems)
      );
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
