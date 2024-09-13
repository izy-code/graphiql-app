import './global.scss';
import 'react-toastify/dist/ReactToastify.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import clsx from 'clsx';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import customButtonStyles from '@/components/custom-button/CustomButton.module.scss';
import { Toast } from '@/components/toast/Toast';
import errorPageStyles from '@/page-components/error-page/ErrorPage.module.scss';
import { StoreProvider } from '@/store/store-provider';

export const metadata: Metadata = {
  title: 'REST/GraphiQL client',
  description: 'REST/GraphiQL client as final team project at Rolling Scopes school React course',
};

export default function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}): ReactNode {
  return (
    <html lang={locale}>
      <body>
        <StoreProvider>
          <AppRouterCacheProvider>
            {children}
            <Toast />
          </AppRouterCacheProvider>
        </StoreProvider>
        {/* Allows to apply styles in global-error.tsx */}
        <div className={clsx(customButtonStyles.dummy, errorPageStyles.dummy)} />
      </body>
    </html>
  );
}
