import withSearchData from '@/core/hoc/withSearchData';
import { LayoutResults } from '@/layout';

const { getServerSideProps, Component } = withSearchData(LayoutResults);
export { getServerSideProps };
export default Component;
