import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { ResultsType } from '@/components/smart/searchContainer/types';
import { useRouter } from 'next/router';

export const LayoutResults = (props: ResultsType): JSX.Element => {
  const router = useRouter();

  const handlePageChange = (newPage: number): void => {
    void router.push(`/page/${newPage}`);
  };

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...props} onPageChange={handlePageChange} />
    </>
  );
};
