import HomeComponent, { IURLSearchParams } from '@/app/page';
import { Params } from '@/types';

const PageComponent = ({
  searchParams,
  params,
}: {
  searchParams: IURLSearchParams;
  params: Params;
}) => {
  return (
    <>
      <HomeComponent params={params} searchParams={searchParams} />
    </>
  );
};

export default PageComponent;
