'use client';

import { type ReactNode } from 'react';

import { ErrorPage } from '@/page-components/error-page/ErrorPage';

export default function Error({ error }: { error: Error & { digest?: string } }): ReactNode {
  return <ErrorPage errorMessage={error?.message} />;
}
