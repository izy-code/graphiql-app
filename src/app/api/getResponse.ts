export interface RestResponseData {
  status?: string;
  data?: object;
  errorMessage?: string;
}

export async function getResponse(
  method: string,
  endpoint: string,
  headers: Record<string, string> = {},
  body?: string,
): Promise<RestResponseData> {
  try {
    if (!endpoint) {
      return { errorMessage: 'No endpoint or query provided' };
    }

    const options: RequestInit = {
      method,
      headers,
      cache: 'no-store',
    };

    if (method !== 'GET' && body) {
      options.body = JSON.stringify(JSON.parse(body));
    }
    const response = await fetch(endpoint, options);
    const responseBody = (await response.json()) as { data?: object; errors?: object };

    if ('errors' in responseBody && Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
      return { errorMessage: 'Response body contains errors' };
    }

    return { status: response.status.toString(), data: responseBody };
  } catch (err) {
    return { errorMessage: 'Unknown error occurred while making the request', status: 'Fetch error' };
  }
}
