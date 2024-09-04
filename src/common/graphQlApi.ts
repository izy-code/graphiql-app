'use server';

import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql';
import { gql, request } from 'graphql-request';

import type { IData } from '@/components/client-table/types.ts';

export interface QueryParams {
  query: string;
  variables?: string | null;
  headers?: string | null;
}

interface ParsedResponse {
  data?: object;
}

export interface GraphQLResponseData {
  status?: number;
  data?: object;
  errorMessage?: string;
}

export const getAPISchema = async (
  url: string,
): Promise<{ response: IntrospectionQuery | null; error: string | null }> => {
  try {
    const response = await request<IntrospectionQuery>(
      url,
      gql`
        ${getIntrospectionQuery()}
      `,
    );
    return { response, error: null };
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;
      return { response: null, error: `During the SDL request to ${url} an error occurred:${message}` };
    }

    throw error;
  }
};

export const makeRequest = async (
  endpoint: string,
  query: string,
  variables = '{}',
  headers: IData[] = [],
): Promise<GraphQLResponseData> => {
  try {
    if (!endpoint || !query) {
      return { errorMessage: 'No endpoint or query provided' };
    }

    let parsedVariables = {};

    try {
      parsedVariables = JSON.parse(variables.trim() || '{}') as object;
    } catch (error) {
      return { errorMessage: 'Variables field is not valid JSON' };
    }

    const headersObject = headers.reduce(
      (acc, header) => {
        if (header.key && header.value) {
          acc[header.key] = header.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headersObject,
      },
      body: JSON.stringify({
        query,
        variables: parsedVariables,
      }),
    });

    const responseData = (await response.json()) as ParsedResponse;

    if (response.ok) {
      if (!('data' in responseData)) {
        return { errorMessage: 'Unknown response structure: no data field. Check endpoint and request params.' };
      }

      return { status: response.status, data: responseData.data };
    }

    return { status: response.status, data: responseData };
  } catch (error) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: 'Unknown error occurred while making the request' };
  }
};
