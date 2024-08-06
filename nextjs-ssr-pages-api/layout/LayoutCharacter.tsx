import { useRouter } from 'next/router';
import { useState } from 'react';

import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchDetails } from '@/components/smart/searchDetail';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { LayoutCharacterProps } from './types';

export const LayoutCharacter = ({
  searchResults,
  characterDetails,
}: LayoutCharacterProps): JSX.Element => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const handlePageChange = (newPage: number): void => {
    if (!isNavigating) {
      setIsNavigating(true);
      void router.push(`/page/${newPage}`).then(() => setIsNavigating(false));
    }
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
