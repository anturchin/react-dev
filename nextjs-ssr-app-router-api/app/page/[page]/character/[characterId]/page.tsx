import HomeComponent, { IURLSearchParams } from '@/app/page';
import { SearchDetails } from '@/components/smart/searchDetail';
import { fetchSearchDetails } from '@/core/utils/fetchUtils';
import { Params } from '@/types';

const CharacterAndResultsPage = async ({ searchParams, params }: { searchParams: IURLSearchParams, params: Params }) => {
  const characterId = params.characterId;
  const characterDetails = await fetchSearchDetails(Number(characterId));

  return (
    <>
      <HomeComponent params={params} searchParams={searchParams}>
        <SearchDetails {...characterDetails} currentPage={Number(params.page)} />
      </HomeComponent>
    </>
  );
};

export default CharacterAndResultsPage;
