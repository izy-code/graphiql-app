'use client';

import { type ReactNode } from 'react';

import { ErrorPage } from '@/page-components/error-page/ErrorPage';

export default function GlobalError({ error }: { error: Error & { digest?: string } }): ReactNode {
  return (
    <html lang="en">
      <body>
        <ErrorPage errorMessage={error?.message} />
      </body>
    </html>
  );
}
