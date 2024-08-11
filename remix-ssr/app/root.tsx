import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { ReactNode } from 'react';

import { StoreProvider } from '../components/smart/storeProvider';

import './global.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={'body'}>
        <StoreProvider>{children}</StoreProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
