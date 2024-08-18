import { MutableRefObject, RefObject } from 'react';

export const enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export type RefInput = MutableRefObject<{
  [p: string]: RefObject<HTMLInputElement>;
}>;
export type RefOption = MutableRefObject<{
  [p: string]: RefObject<HTMLSelectElement>;
}>;
