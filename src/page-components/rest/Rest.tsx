'use client';

import { notFound, usePathname, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';

import { ProtectedPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { ObjectWithId } from '@/components/client-table/types';
import ResponseContainer from '@/components/response-container/ResponseContainer';
import RestFieldset from '@/components/rest-fieldset/RestFieldset';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useEncodeUrl } from '@/hooks/useEncodeUrl';
import { useCurrentLocale } from '@/locales/client';
import { setBody, setEndpoint, setHeaders, setMethod } from '@/store/rest-slice/rest-slice';
import { decodeBase64, generateUniqueId } from '@/utils/utils.ts';

import styles from './Rest.module.scss';

function Rest(): ReactNode {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const didMount = useRef(false);
  const locale = useCurrentLocale();
  const { replaceCompleteUrl } = useEncodeUrl();

  useEffect(() => {
    if (!didMount.current) {
      const pathParts: string[] = pathname.split('/').filter((_, index) => index > 2);

      if (pathParts.length >= 4) {
        notFound();
      }

      if (pathParts.length >= 3) {
        const [methodParam, endpointParam, headersParam, bodyParam] = pathParts;

        dispatch(setMethod(methodParam || 'GET'));
        dispatch(setEndpoint(decodeBase64(endpointParam || '') || ''));
        dispatch(setBody(decodeBase64(bodyParam || '') || ''));
        try {
          const decodedHeaders = decodeBase64(headersParam || '');
          const headersArray: ObjectWithId[] = JSON.parse(decodedHeaders) as ObjectWithId[];
          dispatch(setHeaders(headersArray));
        } catch (jsonError) {
          dispatch(setHeaders([]));
        }
      }

      if (pathname !== `/${locale}${ProtectedPaths.REST}`) {
        const decodedHeaders: ObjectWithId[] = [];

        searchParams.forEach((value, key) => {
          decodedHeaders.push({ id: generateUniqueId(), key, value: decodeURIComponent(value) });
        });
        dispatch(setHeaders(decodedHeaders));
      }

      replaceCompleteUrl();

      didMount.current = true;
    }
  }, [pathname, searchParams, dispatch, replaceCompleteUrl, locale]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>REST Client</h1>
        <RestFieldset />
      </div>
      <ResponseContainer type="rest" />
    </div>
  );
}

export default AuthRoute(Rest);
