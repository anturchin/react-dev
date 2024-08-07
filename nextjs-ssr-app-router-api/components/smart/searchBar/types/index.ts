export const enum AdditionalClass {
  RED = 'red',
}

export interface SearchBarProps {
  triggerError?: () => void;
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export interface SearchBarState {
  query: string;
}
