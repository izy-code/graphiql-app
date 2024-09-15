'use client';

import { notFound, usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { NO_ENDPOINT } from '@/common/constants';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { TableRow } from '@/components/client-table/types';
import { ResponseContainer } from '@/components/response-container/ResponseContainer';
import { RestFieldset } from '@/components/rest-fieldset/RestFieldset';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useCurrentLocale, useI18n, useScopedI18n } from '@/locales/client';
import { setBody, setEndpoint, setHeaders, setMethod, setResponseBody, setStatus } from '@/store/rest-slice/rest-slice';
import { decodeBase64, generateUniqueId, translateText } from '@/utils/utils';

import styles from './Rest.module.scss';

interface RestProps {
  responseData: {
    status?: string;
    data?: object;
    errorMessage?: string;
  } | null;
}

function Rest({ responseData }: RestProps): ReactNode {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const didMount = useRef(false);
  const locale = useCurrentLocale();
  const translate = useScopedI18n('rest');
  const translateErrors = useI18n();

  const isShowResponse = useAppSelector((state) => state.rest.isShowResponse);

  useEffect(() => {
    if (!didMount.current) {
      const pathParts: string[] = pathname.split('/').filter((_, index) => index > 1);

      if (pathParts.length >= 4) {
        notFound();
      }

      if (responseData) {
        dispatch(
          setStatus(
            responseData.status === 'restApi.errors.status'
              ? translateText(responseData.status as never)
              : responseData.status || '',
          ),
        );

        if (isShowResponse) {
          if (responseData.errorMessage) {
            toast.error(translateErrors(responseData.errorMessage as never));
          } else {
            toast.info(translate('request.completed'));
          }
        }

        if (!responseData.errorMessage && responseData.data) {
          dispatch(setResponseBody(JSON.stringify(responseData.data, null, 2)));
        } else {
          dispatch(setResponseBody(''));
        }
      }

      const [methodParam, endpointParam, bodyParam] = pathParts;
      dispatch(setMethod(methodParam?.toUpperCase() || 'GET'));

      if (endpointParam !== NO_ENDPOINT) {
        dispatch(setEndpoint(decodeBase64(endpointParam || '')));
      } else {
        dispatch(setEndpoint(''));
      }

      dispatch(setBody(decodeBase64(bodyParam || '')));

      let decodedHeaders: TableRow[] = [];

      if (pathParts.length < 2 && searchParams.size === 0) {
        decodedHeaders = [{ id: generateUniqueId(), key: 'Content-Type', value: 'application/json' }];
        window.history.replaceState(
          null,
          '',
          `/${locale}/${methodParam}/?Content-Type=${encodeURIComponent('application/json')}`,
        );
      }

      searchParams.forEach((value, key) => {
        decodedHeaders.push({
          id: generateUniqueId(),
          key: decodeURIComponent(key),
          value: decodeURIComponent(value),
        });
      });
      dispatch(setHeaders(decodedHeaders));

      didMount.current = true;
    }
  }, [responseData, pathname, searchParams, dispatch, locale, isShowResponse, translate, translateErrors]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{translate('title')}</h1>
        <RestFieldset />
      </div>
      {isShowResponse && <ResponseContainer type="rest" />}
    </div>
  );
}

export default AuthRoute(Rest);
