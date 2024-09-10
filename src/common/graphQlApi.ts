'use server';

import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql';

import type { TableRow } from '@/components/client-table/types.ts';

export interface GraphQLResponseData {
  status?: string;
  data?: object;
  errorMessage?: string;
}

export interface SchemaResponseData {
  data?: IntrospectionQuery;
  errorMessage?: string;
}

const createHeadersObject = (headers: TableRow[] = []): Record<string, string> =>
  headers.reduce(
    (acc, header) => {
      if (header.key.trim() && header.value.trim()) {
        acc[header.key] = header.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

export const getSchema = async (endpoint: string, headers: TableRow[] = []): Promise<SchemaResponseData> => {
  try {
    if (!endpoint) {
      return { errorMessage: 'No schema endpoint provided' };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...createHeadersObject(headers),
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    const responseBody = (await response.json()) as { data?: object; errors?: object };

    if ('errors' in responseBody && Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
      return { errorMessage: 'Response body contains errors' };
    }

    if (response.ok) {
      if ('data' in responseBody && responseBody.data && '__schema' in responseBody.data) {
        return { data: responseBody.data as IntrospectionQuery };
      }

      return {
        errorMessage: 'Unknown response structure: no "data" or "__schema" fields. Check endpoint and headers.',
      };
    }

    return { errorMessage: `Fetch failed with status code: ${response.status}` };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'fetch failed') {
        return { errorMessage: 'Failed to fetch schema' };
      }

      return { errorMessage: error.message };
    }

    return { errorMessage: 'Unknown error occurred while making the request' };
  }
};

export const getResponse = async (
  endpoint: string,
  query: string,
  variables = '{}',
  headers: TableRow[] = [],
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

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...createHeadersObject(headers),
      },
      body: JSON.stringify({
        query,
        variables: parsedVariables,
      }),
    });

    const responseBody = (await response.json()) as { data?: object; errors?: object };

    if ('errors' in responseBody && Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
      return { errorMessage: 'Response body contains errors' };
    }

    if (response.ok) {
      if (!('data' in responseBody)) {
        return { errorMessage: 'Unknown response structure: no data field. Check endpoint and request params.' };
      }

      return { status: response.status.toString(), data: responseBody.data };
    }

    return { status: response.status.toString(), data: responseBody };
  } catch {
    return { errorMessage: 'Unknown error occurred while making the request', status: 'Fetch error' };
  }
};
