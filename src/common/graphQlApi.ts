'use server';

import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql';
import { gql, request } from 'graphql-request';

export interface QueryParams {
  query: string;
  variables?: string | null;
  headers?: string | null;
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
  url: string,
  { query, variables, headers }: QueryParams,
): Promise<Record<string, unknown>> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...(JSON.parse(headers || '{}') as Record<string, string>), 'Content-type': 'application/json' },
      body: JSON.stringify({ query, variables: JSON.parse(variables || '{}') as Record<string, unknown> }),
    });
    const parsedResponse = (await response.json()) as Record<string, unknown>;
    console.log(parsedResponse);
    return parsedResponse;
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;

      return {
        data: null,
        errors: [{ message: `During the GQL request to ${url} an error occurred:${message}` }],
      };
    }

    throw error;
  }
};

export const makeRequest1 = async (
  url: string,
  { query, variables, headers }: QueryParams,
): Promise<Record<string, unknown>> => {
  try {
    const response = await request<IntrospectionQuery>(
      url,
      gql`
        ${query}
      `,
    );

    const parsedResponse = (await response.json()) as Record<string, unknown>;
    console.log(parsedResponse);
    return parsedResponse;
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;

      return {
        data: null,
        errors: [{ message: `During the GQL request to ${url} an error occurred:${message}` }],
      };
    }

    throw error;
  }
};
