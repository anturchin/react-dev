import { IStringUtils } from "./types";

export const stringUtils: IStringUtils = {};

stringUtils.trimString = (str: string): string => {
  return str.trim();
};
