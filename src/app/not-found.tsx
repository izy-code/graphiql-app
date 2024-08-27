import type { ReactNode } from 'react';

import ErrorStatusPage from '@/page-components/error-status-page/ErrorStatusPage';

export default function Page404(): ReactNode {
  return <ErrorStatusPage status={404} message="The page you requested was not found." />;
}
