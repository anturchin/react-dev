import { ReactNode } from "react";

export const enum AdditionalClass {
  RED = "red",
}
export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  message: string;
  hasError: boolean;
}
