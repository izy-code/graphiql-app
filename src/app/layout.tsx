import './global.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import clsx from 'clsx';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import customButtonStyles from '@/components/custom-button/CustomButton.module.scss';
import { Toast } from '@/components/toast/Toast';
import errorPageStyles from '@/page-components/error-page/ErrorPage.module.scss';
import { StoreProvider } from '@/store/store-provider';

import { getLocale } from './not-found';

export const metadata: Metadata = {
  title: 'REST/GraphiQL client',
  description: 'REST/GraphiQL client as final team project at Rolling Scopes school React course',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang={getLocale()}>
      <body>
        <StoreProvider>
          <AppRouterCacheProvider>
            {children}
            <Toast />
          </AppRouterCacheProvider>
        </StoreProvider>
        <div className={clsx(customButtonStyles.dummy, errorPageStyles.dummy)} />
      </body>
    </html>
  );
}
