import HomeComponent from '@/app/page';
import { Params } from '@/types';

const PageComponent = ({ params }: { params: Params }) => {
  return (
    <>
      <HomeComponent params={params}></HomeComponent>
    </>
  );
};

export default PageComponent;
