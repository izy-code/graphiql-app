import { notFound } from 'next/navigation';
import React, { type ReactNode } from 'react';

import Rest from '../../../../page-components/rest/Rest';

export default function RestPage({ params }: { params: { method: string } }): ReactNode {
  const { method } = params;
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

  if (!validMethods.includes(method.toUpperCase())) {
    notFound();
  }

  return <Rest />;
}
