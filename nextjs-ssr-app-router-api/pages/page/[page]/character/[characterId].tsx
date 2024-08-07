import { LayoutCharacter } from '@/layout';
import withDetailsData from '@/core/hoc/withDetailsData';

const { getServerSideProps, Component } = withDetailsData(LayoutCharacter);
export { getServerSideProps };
export default Component;
