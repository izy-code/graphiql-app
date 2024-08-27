import './global.scss';
import 'react-toastify/dist/ReactToastify.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Toast } from '@/components/toast/Toast';
import { AuthProvider } from '@/contexts/auth-context';
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
            <AuthProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Toast />
            </AuthProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
