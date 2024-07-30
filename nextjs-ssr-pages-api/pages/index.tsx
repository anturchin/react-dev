import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { GetStaticProps } from 'next';

import { ResultsType } from '@/components/smart/searchContainer/types';
import { apiService } from '@/core/services/apiService';
import { SwitchTheme } from '@/components/simple/switchTheme';
import { Wrapper } from '@/components/simple/wrapper';

export const getStaticProps: GetStaticProps<ResultsType> = async () => {

  const { info: { pages }, results } = await apiService.fetchSearchResults(process.env.PUBLIC_BASE_URL as string, '');

  return {
    props: {
      results,
      currentPage: 1,
      isError: false,
      pages,
    }
  }
}

const Home = (props: ResultsType): JSX.Element => {
  return (
    <Wrapper>
      <SwitchTheme />
      <SearchContainer { ...props } />
    </Wrapper>
  );
};

export default Home;
