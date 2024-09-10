import { type ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { I18nProviderClient } from '@/locales/client';

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}): ReactNode {
  return (
    <I18nProviderClient locale={locale}>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </I18nProviderClient>
  );
}
