import { type ReactNode } from 'react';

import { getLocale } from '@/app/not-found';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Loader } from '@/components/loader/Loader';
import { AuthProvider } from '@/contexts/auth-context';
import { MuiProvider } from '@/contexts/mui-context';
import { I18nProviderClient } from '@/locales/client';
import ErrorStatusPage from '@/page-components/error-status-page/ErrorStatusPage';

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}): ReactNode {
  if (!['en', 'ru'].includes(locale)) {
    return (
      <I18nProviderClient locale={getLocale()}>
        <main className="main">
          <ErrorStatusPage status={404} />
          <div style={{ display: 'none' }}>{children}</div>
        </main>
      </I18nProviderClient>
    );
  }

  return (
    <I18nProviderClient locale={locale} fallback={<Loader />}>
      <MuiProvider>
        <AuthProvider>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </AuthProvider>
      </MuiProvider>
    </I18nProviderClient>
  );
}
