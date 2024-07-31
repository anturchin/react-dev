import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { GetStaticProps } from 'next';

import { ResultsType } from '@/components/smart/searchContainer/types';
import { apiService } from '@/core/services/apiService';
import { SwitchTheme } from '@/components/simple/switchTheme';

export const getStaticProps: GetStaticProps<ResultsType> = async () => {
  const {
    info: { pages },
    results,
  } = await apiService.fetchSearchResults(process.env.BASE_URL as string, '');

  return {
    props: {
      results,
      currentPage: 1,
      isError: false,
      pages,
    },
  };
};

const Home = (props: ResultsType): JSX.Element => {
  return (
    <>
      <SwitchTheme />
      <SearchContainer {...props} />
    </>
  );
};

export default Home;
