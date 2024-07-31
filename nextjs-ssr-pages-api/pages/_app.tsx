import type { AppProps } from "next/app";

import "@/styles/globals.css";

import { Wrapper } from "@/components/smart/wrapper";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
};

export default App;
