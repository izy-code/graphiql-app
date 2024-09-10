import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { I18nProviderClient } from '@/locales/client';
import { getScopedI18n } from '@/locales/server';
import ErrorStatusPage from '@/page-components/error-status-page/ErrorStatusPage';

export default async function Page404(): Promise<ReactNode> {
  const translate = await getScopedI18n('404');

  const cookieStore = cookies();
  const locale = cookieStore.get('Next-Locale');

  return (
    <I18nProviderClient locale={locale?.value || 'en'}>
      <ErrorStatusPage status={404} message={translate('message')} />
    </I18nProviderClient>
  );
}
