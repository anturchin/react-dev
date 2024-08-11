import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { fetchSearchDetails, fetchSearchResults } from '../../core/utils/fetchUtils';
import { HomeComponent } from '~/components/HomePage';
import { ResultsType } from '../../components/smart/searchContainer/types';
import { IDetailsCharacter } from '../../components/smart/searchDetail/types';
import { SearchContainer } from '../../components/smart/searchContainer/SearchContainer';
import { SearchDetails } from '../../components/smart/searchDetail';

export type CombinedType = {
  searchResults: ResultsType;
  characterDetails: IDetailsCharacter;
};

export const loader: LoaderFunction = async ({ params }) => {
  const page = parseInt(params.page || '1', 10);
  const characterId = params.characterId as string;

  const searchResults = await fetchSearchResults(page, '');
  const characterDetails = await fetchSearchDetails(Number(characterId));

  return json({ searchResults, characterDetails });
};

export default function CharacterRoute() {
  const { searchResults, characterDetails } = useLoaderData<CombinedType>();

  return (
    <HomeComponent>
      <SearchContainer {...searchResults}>
        <SearchDetails {...characterDetails} currentPage={searchResults.currentPage} />
      </SearchContainer>
    </HomeComponent>
  );
}
