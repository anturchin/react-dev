export type ResultPropType = {
  id: number;
  name: string;
  gender: string;
  image: string;
};

export interface ISearchResultsProps {
  results: ResultPropType[];
  onResultClick: () => void;
  onInfoDetailsClick: (id: number) => void;
}