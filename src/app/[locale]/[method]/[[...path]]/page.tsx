import { notFound } from 'next/navigation';
import React, { type ReactNode } from 'react';

import { VALID_METHODS } from '@/common/constants';
import { getResponse } from '@/common/restApi.ts';
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

  if (endpoint) {
    try {
      responseData = await getResponse(method.toUpperCase(), endpoint, headersArray, body);
    } catch (error) {
      responseData = { errorMessage: 'Failed to fetch the response' };
    }
  }
  return <Rest responseData={responseData} />;
}
