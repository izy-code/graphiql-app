'use client';

import { type ReactNode } from 'react';

import { I18nProviderClient } from '@/locales/client';
import { ErrorPage } from '@/page-components/error-page/ErrorPage';

export default function GlobalError({ error }: { error: Error & { digest?: string } }): ReactNode {
  const locale = window.location.pathname.split('/').includes('en') ? 'en' : 'ru';

  return (
    <html lang={locale}>
      <body>
        <I18nProviderClient locale={locale}>
          <ErrorPage errorMessage={error?.message} />
        </I18nProviderClient>
      </body>
    </html>
  );
}
