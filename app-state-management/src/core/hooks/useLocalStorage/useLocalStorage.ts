import { useEffect, useState } from 'react';
import { localStorageService } from '../../services/localStorageService/localStorageService';
import { localStorageType } from './types';
import { LsKey } from '../../services/localStorageService/types';

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
