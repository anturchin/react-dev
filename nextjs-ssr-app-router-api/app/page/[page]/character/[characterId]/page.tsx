import HomeComponent from '@/app/page';
import { SearchDetails } from '@/components/smart/searchDetail';
import { fetchSearchDetails } from '@/core/utils/fetchUtils';
import { Params } from '@/types';

const CharacterAndResultsPage = async ({ params }: { params: Params }) => {
  const characterId = params.characterId;
  const characterDetails = await fetchSearchDetails(Number(characterId));

  return (
    <>
      <HomeComponent params={params}>
        <SearchDetails {...characterDetails} currentPage={Number(params.page)} />
      </HomeComponent>
    </>
  );
};

export default CharacterAndResultsPage;
