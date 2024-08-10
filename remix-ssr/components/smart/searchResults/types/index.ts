export type ResultPropType = {
  id: number;
  name: string;
  gender: string;
  image: string;
};

export const enum ImageSize {
  WIDTH = 200,
  HEIGHT = 220,
}

export interface ISearchResultsProps {
  results: ResultPropType[];
  onResultClick: () => void;
  onInfoDetailsClick: (id: number) => void;
}
