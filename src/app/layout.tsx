import './global.scss';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';
import StoreProvider from '@/store/store-provider';

export const metadata: Metadata = {
  title: 'REST/GraphiQL client',
  description: 'REST/GraphiQL client as final team project at Rolling Scopes school React course',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <StoreProvider>{children}</StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
