'use server';

import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql';

import type { ObjectWithId } from '@/components/client-table/types';

export interface GraphQLResponseData {
  status?: string;
  data?: object;
  errorMessage?: string;
}

export interface SchemaResponseData {
  data?: IntrospectionQuery;
  errorMessage?: string;
  status?: string;
}

const createHeadersObject = (headers: ObjectWithId[] = []): Record<string, string> =>
  headers.reduce(
    (acc, header) => {
      if (header.key.trim() && header.value.trim()) {
        acc[header.key] = header.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

export const getSchema = async (endpoint: string, headers: ObjectWithId[] = []): Promise<SchemaResponseData> => {
  try {
    if (!endpoint) {
      return { errorMessage: 'graphQlApi.schema-errors.endpoint' };
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
      return { errorMessage: 'graphQlApi.schema-errors.body' };
    }

    if (response.ok) {
      if ('data' in responseBody && responseBody.data && '__schema' in responseBody.data) {
        return { data: responseBody.data as IntrospectionQuery };
      }

      return { errorMessage: 'graphQlApi.schema-errors.data' };
    }

    return { errorMessage: 'graphQlApi.schema-errors.fetch-status', status: String(response.status) };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'fetch failed') {
        return { errorMessage: 'graphQlApi.schema-errors.fetch' };
      }

      if (error.message === `Failed to parse URL from ${endpoint}`) {
        return { errorMessage: 'graphQlApi.schema-errors.parse' };
      }

      return { errorMessage: error.message };
    }

    return { errorMessage: 'graphQlApi.schema-errors.unknown' };
  }
};

export const getResponse = async (
  endpoint: string,
  query: string,
  variables = '{}',
  headers: ObjectWithId[] = [],
): Promise<GraphQLResponseData> => {
  try {
    if (!endpoint || !query) {
      return { errorMessage: 'graphQlApi.response-errors.endpoint' };
    }

    let parsedVariables = {};

    try {
      parsedVariables = JSON.parse(variables.trim() || '{}') as object;
    } catch {
      return { errorMessage: 'graphQlApi.response-errors.variables' };
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
      return { errorMessage: 'graphQlApi.response-errors.body' };
    }

    if (response.ok) {
      if (!('data' in responseBody)) {
        return { errorMessage: 'graphQlApi.response-errors.data' };
      }

      return { status: response.status.toString(), data: responseBody.data };
    }

    return { status: response.status.toString(), data: responseBody };
  } catch {
    return { errorMessage: 'graphQlApi.response-errors.unknown', status: 'graphQlApi.response-errors.status' };
  }
};
