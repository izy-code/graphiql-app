import { type ReactNode } from 'react';

import { NO_ENDPOINT, VALID_METHODS } from '@/common/constants';
import { getResponse } from '@/common/restApi';
import ErrorStatusPage from '@/page-components/error-status-page/ErrorStatusPage';
import Rest from '@/page-components/rest/Rest';
import { decodeBase64 } from '@/utils/utils';

interface RestPageProps {
  params: {
    method: string;
    path?: string[];
  };
  searchParams: Record<string, string>;
}

export default async function RestPage({ params, searchParams }: RestPageProps): Promise<ReactNode> {
  const { method } = params;

  if (!VALID_METHODS.includes(method.toUpperCase())) {
    return <ErrorStatusPage status={404} />;
  }

  const pathArray = params.path || [];
  const endpointPath = pathArray[0] || '';
  const bodyPath = pathArray[1] || '';

  const endpoint = endpointPath === NO_ENDPOINT || endpointPath === '' ? '' : decodeBase64(endpointPath);
  const body = bodyPath ? decodeBase64(bodyPath) : '';

  const responseData = await getResponse(method.toUpperCase(), endpoint, searchParams, body);

  return <Rest responseData={responseData} />;
}
