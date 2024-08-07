import { LsKey } from '@/core/services/localStorageService/types';

export type localStorageType = [string, (key: LsKey, newValue: string) => void];
