import type { AppProps } from 'next/app';

import { Wrapper } from '@/components/smart/wrapper';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
};

export default App;
