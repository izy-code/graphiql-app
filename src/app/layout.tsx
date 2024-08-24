import './global.scss';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { StoreProvider } from '@/store/store-provider';

export const metadata: Metadata = {
  title: 'REST/GraphiQL client',
  description: 'REST/GraphiQL client as final team project at Rolling Scopes school React course',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppRouterCacheProvider>
            <Header />
            {children}
            <Footer />
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
