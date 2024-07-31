import { useEffect, useState } from 'react';

import { localStorageService } from '@/core/services/localStorageService';
import { localStorageType } from './types';
import { LsKey } from '@/core/services/localStorageService/types';

export const useLocalStorage = (key: LsKey): localStorageType => {
  const [value, setValue] = useState(() => {
    return localStorageService.getQuery(key) || '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorageService.getQuery(key);
      if (storedValue) {
        setValue(storedValue);
      }
    }
  }, [key]);

  const handleChangeValue = (key: LsKey, newValue: string): void => {
    if (typeof window !== 'undefined') {
      localStorageService.saveQuery(key, newValue);
      setValue(newValue);
    }
  };

  return [value, handleChangeValue];
};