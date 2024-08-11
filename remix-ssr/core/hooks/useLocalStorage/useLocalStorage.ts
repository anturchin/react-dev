import { useEffect, useState } from 'react';

import { localStorageType } from './types';
import { LsKey } from '../../services/localStorageService/types';
import { localStorageService } from '../../services/localStorageService';

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
