export type DetailsOrigin = {
  name: string;
  url: string;
};

export type DetailsLocation = DetailsOrigin;

export type DetailsCharactersType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: DetailsOrigin;
  location: DetailsLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export interface ISelectedItemDetailsState {
  selectedItemDetails: DetailsCharactersType | null;
}