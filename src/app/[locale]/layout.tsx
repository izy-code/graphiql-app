import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Loader } from '@/components/loader/Loader';
import { AuthProvider } from '@/contexts/auth-context';
import { I18nProviderClient } from '@/locales/client';

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}): ReactNode {
  if (!['en', 'ru'].includes(locale)) {
    notFound();
  }

  return (
    <I18nProviderClient locale={locale} fallback={<Loader />}>
      <AuthProvider>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </AuthProvider>
    </I18nProviderClient>
  );
}
