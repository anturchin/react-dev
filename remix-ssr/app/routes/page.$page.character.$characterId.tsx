import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { fetchSearchDetails } from '../../core/utils/fetchUtils';
import { IDetailsCharacter } from '../../components/smart/searchDetail/types';
import { SearchDetails } from '../../components/smart/searchDetail/SearchDetails';

export type CombinedType = {
  currentPage: number;
  characterDetails: IDetailsCharacter;
};

export const loader: LoaderFunction = async ({ params }) => {
  const page = parseInt(params.page || '1', 10);
  const characterId = params.characterId as string;

  const characterDetails = await fetchSearchDetails(Number(characterId));

  return json({ currentPage: page, characterDetails });
};

export default function CharacterRoute() {
  const { currentPage, characterDetails } = useLoaderData<CombinedType>();

  return (
    <>
      <SearchDetails {...characterDetails} currentPage={currentPage} />
    </>
  );
}
