import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';

import { ResultsType } from '@/components/smart/searchContainer/types';
import { fetchSearchResults } from '../utils/fetchUtils';

const withSearchData = (WrappedComponent: ComponentType<ResultsType>) => {
  const getServerSideProps: GetServerSideProps<ResultsType> = async (context) => {
    const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;
    const name = context.query.name ? (context.query.name as string) : '';

    const data = await fetchSearchResults(page, name);

    return {
      props: data,
    };
  };

  return { getServerSideProps, Component: WrappedComponent };
};

export default withSearchData;
