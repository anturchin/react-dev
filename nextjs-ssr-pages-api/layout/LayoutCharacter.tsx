import { useRouter } from 'next/router';

import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchDetails } from '@/components/smart/searchDetail';
import { LayoutCharacterProps } from './types';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { useState } from 'react';

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
