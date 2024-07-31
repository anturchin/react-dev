import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { ResultsType } from '@/components/smart/searchContainer/types';
import { apiService } from '@/core/services/apiService';
import { SwitchTheme } from '@/components/simple/switchTheme';

export const getServerSideProps: GetServerSideProps<ResultsType> = async (context) => {
  const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;
  const {
    info: { pages },
    results,
  } = await apiService.fetchSearchResults(process.env.BASE_URL as string, "", Number(page));

  return {
    props: {
      results,
      currentPage: page,
      isError: false,
      pages,
    },
  };
};

const Home = (props: ResultsType): JSX.Element => {
  const router = useRouter();

  const handlePageChange = (newPage: number): void => {
    void router.push(`/?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...props} onPageChange={handlePageChange} />
    </>
  );
};

export default Home;
