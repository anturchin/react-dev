import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { fetchSearchResults } from '@/core/utils/fetchUtils';

type Params = {
  page: string;
};

const PageComponent = async ({ params }: { params: Params }) => {
  const page = parseInt(params.page, 10) || 1;
  const searchResults = await fetchSearchResults(page, '');

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...searchResults} />
    </>
  );
};

export default PageComponent;
