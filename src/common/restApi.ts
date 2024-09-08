'use server';

import type { ObjectWithId } from '@/components/client-table/types.ts';

export interface RestResponseData {
  status?: string;
  data?: object;
  errorMessage?: string;
}

const convertToHeadersObject = (data: ObjectWithId[]): { [key: string]: string } =>
  Object.fromEntries(data.filter(({ key, value }) => key.trim() && value.trim()).map(({ key, value }) => [key, value]));

const replaceVariables = (text: string, variables: ObjectWithId[]): string => {
  const variableMap = Object.fromEntries(
    variables.filter(({ key, value }) => key.trim() && value.trim()).map(({ key, value }) => [key, value]),
  );

  let result = text;
  Object.entries(variableMap).forEach(([variableKey, variableValue]) => {
    const variablePlaceholder = `{{${variableKey}}}`;
    result = result.replace(new RegExp(variablePlaceholder, 'g'), variableValue);
  });

  return result.trim();
};

export const getResponse = async (
  method: string,
  endpoint: string,
  headers: ObjectWithId[] = [],
  variables: ObjectWithId[] = [],
  body?: string,
): Promise<RestResponseData> => {
  try {
    if (!endpoint) {
      return { errorMessage: 'No endpoint or query provided' };
    }
    const validHeaders = convertToHeadersObject(headers);

    const options: RequestInit = {
      method,
      headers: validHeaders,
    };

    if (method !== 'GET' && body) {
      options.body = JSON.stringify(JSON.parse(replaceVariables(body, variables)));
    }

    const response = await fetch(endpoint, options);
    const responseBody = (await response.json()) as { data?: object; errors?: object };

    if ('errors' in responseBody && Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
      return { errorMessage: 'Response body contains errors' };
    }

    return { status: response.status.toString(), data: responseBody };
  } catch {
    return { errorMessage: 'Unknown error occurred while making the request', status: 'Fetch error' };
  }
};
