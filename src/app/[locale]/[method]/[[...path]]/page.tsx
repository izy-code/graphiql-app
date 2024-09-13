import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

import { VALID_METHODS } from '@/common/constants';
import { getResponse } from '@/common/restApi';
// import { getScopedI18n } from '@/locales/server';
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
  // const translate = await getScopedI18n('restApi');

  if (!VALID_METHODS.includes(method.toUpperCase())) {
    notFound();
  }

  const pathArray = params.path || [];
  const endpointPath = pathArray[0] || '';
  const bodyPath = pathArray[1] || '';

  const endpoint = endpointPath ? decodeBase64(endpointPath) : '';
  const body = bodyPath ? decodeBase64(bodyPath) : '';
  const headersArray = searchParams;
  let responseData = null;
  /*
  if (endpoint) {
    try {
      responseData = await getResponse(method.toUpperCase(), endpoint, headersArray, body);
    } catch {
      responseData = { errorMessage: translate('errors.fetch') };
    }
  } */

  if (endpoint) {
    responseData = await getResponse(method.toUpperCase(), endpoint, headersArray, body);
  }
  return <Rest responseData={responseData} />;
}
