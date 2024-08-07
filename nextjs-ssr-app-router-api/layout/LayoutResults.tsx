import { useRouter } from 'next/router';
import { useState } from 'react';

import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { ResultsType } from '@/components/smart/searchContainer/types';

export const LayoutResults = (props: ResultsType): JSX.Element => {
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
      <SearchContainer {...props} onPageChange={handlePageChange} />
    </>
  );
};
