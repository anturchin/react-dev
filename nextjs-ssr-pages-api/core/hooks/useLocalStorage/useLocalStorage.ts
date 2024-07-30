import { useEffect, useState } from 'react';

import { localStorageService } from '@/core/services/localStorageService';
import { localStorageType } from './types';
import { LsKey } from '@/core/services/localStorageService/types';

export const useLocalStorage = (key: LsKey): localStorageType => {
  const [value, setValue] = useState(localStorageService.getQuery?.(key) || '');

  useEffect(() => {
    handleChangeValue(key, value);
  }, [value, key]);

  const handleChangeValue = (key: LsKey, newValue: string): void => {
    localStorageService.saveQuery?.(key, newValue);
    setValue(newValue);
  };

  return [value, handleChangeValue];
};