import { useCallback } from 'react';

import { NO_ENDPOINT } from '@/common/constants';
import { ProtectedPaths } from '@/common/enums';
import type { ObjectWithId } from '@/components/client-table/types';
import { useCurrentLocale } from '@/locales/client';
import type { RootState } from '@/store/store';
import { encodeBase64 } from '@/utils/utils';

import { useAppSelector } from './store-hooks';

export const useEncodeUrl = (): {
  getEncodedEndpoint: () => string;
  getEncodedRequestBody: () => string;
  getEncodedHeaders: (headers?: ObjectWithId[]) => string;
  replaceUrl: (urlEnding: string, urlStart?: string) => void;
  replaceCompleteUrl: () => void;
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
    (headersParameter: ObjectWithId[] = headers): string => {
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

  const replaceCompleteUrl = useCallback((): void => {
    if (window.location.pathname === `/${locale}${ProtectedPaths.GRAPHQL}` && !window.location.search) {
      if (query || variables) {
        replaceUrl(`${getEncodedEndpoint()}/${getEncodedRequestBody()}${getEncodedHeaders()}`);
        return;
      }

      replaceUrl(`${getEncodedEndpoint()}${getEncodedHeaders()}`);
    }
  }, [getEncodedEndpoint, getEncodedHeaders, getEncodedRequestBody, query, replaceUrl, variables, locale]);

  return {
    getEncodedEndpoint,
    getEncodedRequestBody,
    getEncodedHeaders,
    replaceUrl,
    replaceCompleteUrl,
  };
};
