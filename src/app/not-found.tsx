import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { I18nProviderClient } from '@/locales/client';
import ErrorStatusPage from '@/page-components/error-status-page/ErrorStatusPage';

export const getLocale = (): string => {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('Next-Locale');

  return localeCookie?.value || 'en';
};

export default function Page404(): ReactNode {
  return (
    <I18nProviderClient locale={getLocale()}>
      <ErrorStatusPage status={404} />
    </I18nProviderClient>
  );
}
