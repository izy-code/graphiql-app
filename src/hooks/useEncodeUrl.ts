import { useCallback } from 'react';

import { NO_ENDPOINT } from '@/common/constants';
import { ProtectedPaths } from '@/common/enums';
import type { IData } from '@/components/client-table/types';
import { useCurrentLocale } from '@/locales/client';
import type { RootState } from '@/store/store';
import { encodeBase64 } from '@/utils/utils';

import { useAppSelector } from './store-hooks';

interface EndpointParams {
  endpointParam?: string;
  queryParam?: string;
  variablesParam?: string;
  headersParam?: IData[];
}

export const useEncodeUrl = (): {
  replaceUrl: (params?: EndpointParams) => void;
} => {
  const { endpoint, query, variables, headers } = useAppSelector((state: RootState) => state.graphql);
  const locale = useCurrentLocale();

  const replaceHistory = useCallback(
    (urlEnding: string): void => {
      window.history.replaceState(null, '', `/${locale}${ProtectedPaths.GRAPHQL}/${urlEnding}`);
    },
    [locale],
  );

  const getEncodedEndpoint = useCallback(
    (params: EndpointParams = {}): string => {
      const {
        endpointParam = endpoint,
        queryParam = query,
        variablesParam = variables,
        headersParam = headers,
      } = params;

      if (endpointParam) {
        return encodeBase64(endpointParam);
      }

      if (queryParam || variablesParam || headersParam.length !== 0) {
        return NO_ENDPOINT;
      }

      return '';
    },
    [endpoint, query, variables, headers],
  );

  const getEncodedRequestBody = useCallback((): string => {
    const requestBody = JSON.stringify({
      query,
      variables,
    });
    return encodeBase64(requestBody);
  }, [query, variables]);

  const getEncodedHeaders = useCallback(
    (headersParameter: IData[] = headers): string => {
      if (!headersParameter.length) {
        return '';
      }

      const encodedHeaders: string[] = [];
      headersParameter.forEach((header) => {
        encodedHeaders.push(`${header.key}=${encodeURIComponent(header.value)}`);
      });

      return `?${encodedHeaders.join('&')}`;
    },
    [headers],
  );

  const replaceUrl = useCallback(
    (params: EndpointParams = {}): void => {
      const { queryParam = query, variablesParam = variables, headersParam = headers } = params;

      if (queryParam || variablesParam) {
        replaceHistory(`${getEncodedEndpoint(params)}/${getEncodedRequestBody()}${getEncodedHeaders(headersParam)}`);

        return;
      }

      replaceHistory(`${getEncodedEndpoint(params)}${getEncodedHeaders(headersParam)}`);
    },
    [query, variables, headers, getEncodedEndpoint, getEncodedRequestBody, getEncodedHeaders, replaceHistory],
  );

  return {
    replaceUrl,
  };
};
