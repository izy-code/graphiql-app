import { type ReactNode } from 'react';

import { I18nProviderClient } from '@/locales/client';

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}): ReactNode {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
