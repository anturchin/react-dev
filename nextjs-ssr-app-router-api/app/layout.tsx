import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';

import { ThemeWrapper } from '@/components/smart/themeWrapper';
import { StoreProvider } from '@/components/smart/storProvider';

import '../styles/globals.css';

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body className="body">
        <StoreProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
