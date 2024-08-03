import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from '@/core/store/store';
import { ThemeWrapper } from '@/components/smart/themeWrapper';
import { localStorageService } from '@/core/services/localStorageService';
import { LsKey } from '@/core/services/localStorageService/types';
import { useEffect } from 'react';

import '@/styles/globals.css';

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { selectedItems } = store.getState();
      localStorageService.saveQuery?.(
        LsKey.SELECTED_ITEMS,
        JSON.stringify(selectedItems.selectedItems)
      );
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
};

export default App;
