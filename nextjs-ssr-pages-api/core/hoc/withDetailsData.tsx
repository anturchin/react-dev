import { LayoutCharacterProps } from '@/layout/types';
import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';
import { fetchSearchResults, fetchSearchDetails } from '../utils/fetchUtils';

const withDetailsData = (WrappedComponent: ComponentType<LayoutCharacterProps>) => {
  const getServerSideProps: GetServerSideProps<LayoutCharacterProps> = async (context) => {
    const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;
    const characterId = context.query.characterId as string;

    const searchResults = await fetchSearchResults(page);
    const characterDetails = await fetchSearchDetails(Number(characterId));

    return {
      props: {
        searchResults: {
          ...searchResults,
        },
        characterDetails: {
          ...characterDetails,
          currentPage: searchResults.currentPage,
        },
      },
    };
  };

  return { getServerSideProps, Component: WrappedComponent };
};

export default withDetailsData;
