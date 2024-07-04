export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export interface SearchBarState {
  query: string;
}
