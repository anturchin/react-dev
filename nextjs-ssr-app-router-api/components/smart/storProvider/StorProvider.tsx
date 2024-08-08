'use client';

import { makeStore } from '@/core/store';
import { AppStore } from '@/core/store/store';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
