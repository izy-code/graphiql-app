import { notFound } from 'next/navigation';
import React, { type ReactNode } from 'react';

import { getResponse } from '@/app/api/getResponse';
import { decodeBase64 } from '@/utils/utils';

import Rest from '../../../../page-components/rest/Rest';

interface RestPageProps {
  params: {
    method: string;
    path?: string[];
  };
  searchParams: Record<string, string>;
}

export default async function RestPage({ params, searchParams }: RestPageProps): Promise<ReactNode> {
  const { method } = params;
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

  if (!validMethods.includes(method.toUpperCase())) {
    return notFound();
  }

  const pathArray = params.path || [];
  const endpointPath = pathArray[0] || '';
  const bodyPath = pathArray[1] || '';

  const endpoint = endpointPath ? decodeBase64(endpointPath) : '';
  const body = bodyPath ? decodeBase64(bodyPath) : '';
  const headersArray = searchParams;
  let responseData = null;

  if (endpoint) {
    try {
      responseData = await getResponse(method.toUpperCase(), endpoint, headersArray, body);
    } catch (error) {
      responseData = { errorMessage: 'Failed to fetch the response' };
    }
  }
  console.log('responseData', responseData);

  return <Rest responseData={responseData} />;
}
