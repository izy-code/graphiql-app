import { type ReactNode } from 'react';

import { getScopedI18n } from '@/locales/server';
import ErrorStatusPage from '@/page-components/error-status-page/ErrorStatusPage';

export default async function CatchAllPage(): Promise<ReactNode> {
  const translate = await getScopedI18n('404');

  return <ErrorStatusPage status={404} message={translate('message')} />;
}
