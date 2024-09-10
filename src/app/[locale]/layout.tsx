import { type ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { AuthProvider } from '@/contexts/auth-context';
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
      <AuthProvider>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </AuthProvider>
    </I18nProviderClient>
  );
}
