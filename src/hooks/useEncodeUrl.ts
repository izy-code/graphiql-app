import { useCallback } from 'react';

import { NO_ENDPOINT } from '@/common/constants';
import { ProtectedPaths } from '@/common/enums';
import type { IData } from '@/components/client-table/types';
import { useCurrentLocale } from '@/locales/client';
import type { RootState } from '@/store/store';
import { encodeBase64 } from '@/utils/utils';

import { useAppSelector } from './store-hooks';

export const useEncodeUrl = (): {
  getEncodedEndpoint: () => string;
  getEncodedRequestBody: () => string;
  getEncodedHeaders: (headers?: IData[]) => string;
  replaceUrl: (urlEnding: string, urlStart?: string) => void;
} => {
  const { endpoint, query, variables, headers } = useAppSelector((state: RootState) => state.graphql);
  const locale = useCurrentLocale();

  const replaceUrl = useCallback(
    (urlEnding: string, urlStart = `/${locale}${ProtectedPaths.GRAPHQL}/`): void => {
      window.history.replaceState(null, '', `${urlStart}${urlEnding}`);
    },
    [locale],
  );

  const getEncodedEndpoint = useCallback((): string => (endpoint ? encodeBase64(endpoint) : NO_ENDPOINT), [endpoint]);

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

  return {
    getEncodedEndpoint,
    getEncodedRequestBody,
    getEncodedHeaders,
    replaceUrl,
  };
};
