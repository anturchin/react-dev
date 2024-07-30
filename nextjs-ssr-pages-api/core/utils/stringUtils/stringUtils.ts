import { IStringUtils } from './types';

export const stringUtils: IStringUtils = {};

stringUtils.trimString = (str: string): string => {
  return str.trim();
};

stringUtils.cutString = (str: string): string => {
  const end = 20;
  if (str.length > 20) return `${str.slice(0, end)}...`;
  return str;
};