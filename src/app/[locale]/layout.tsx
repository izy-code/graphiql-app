import { type ReactNode } from 'react';

import { Loader } from '@/components/loader/Loader';
import { I18nProviderClient } from '@/locales/client';

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}): ReactNode {
  return (
    <I18nProviderClient locale={locale} fallback={<Loader />}>
      {children}
    </I18nProviderClient>
  );
}
