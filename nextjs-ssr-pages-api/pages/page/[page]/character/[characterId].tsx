import { GetServerSideProps } from 'next';

import { LayoutCharacter } from '@/layout';
import { CharacterProps, LayoutCharacterProps } from '@/layout/types';
import { fetchSearchDetails, fetchSearchResults } from '@/core/utils/fetchUtils';

export const getServerSideProps: GetServerSideProps<LayoutCharacterProps> = async (context) => {
  const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;
  const characterId = context.query.characterId as string;

  const searchResults = await fetchSearchResults(page);

  let characterDetails: CharacterProps;

  try {
    const character = await fetchSearchDetails(Number(characterId));
    characterDetails = character;
  } catch {
    characterDetails = { character: null, isError: true };
  }

  return {
    props: {
      searchResults: {
        ...searchResults,
      },
      characterDetails,
    },
  };
};

const Character = (props: LayoutCharacterProps): JSX.Element => {
  return <LayoutCharacter {...props} />;
};

export default Character;
