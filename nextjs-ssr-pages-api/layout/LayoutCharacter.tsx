import { useRouter } from 'next/router';

import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchDetails } from '@/components/smart/searchDetail';
import { LayoutCharacterProps } from './types';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';

export const LayoutCharacter = ({
  searchResults,
  characterDetails,
}: LayoutCharacterProps): JSX.Element => {
  const router = useRouter();

  const handlePageChange = (newPage: number): void => {
    void router.push(`/page/${newPage}`);
  };

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...searchResults} onPageChange={handlePageChange}>
        <SearchDetails {...characterDetails} />
      </SearchContainer>
    </>
  );
};
