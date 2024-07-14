import { useState } from 'react';
import { localStorageService } from '../../services/localStorageService/localStorageService';
import { localStorageType } from './types';

export const useLocalStorage = (): localStorageType => {
  const [valueQuery, setValueQuery] = useState(
    localStorageService.getQuery?.() || ''
  );

  const handleChangeValue = (newValue: string): void => {
    localStorageService.saveQuery?.(newValue);
    setValueQuery(newValue);
  };

  return { valueQuery, handleChangeValue };
};
