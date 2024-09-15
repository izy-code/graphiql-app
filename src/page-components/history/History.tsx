'use client';

import Link from 'next/link';
import { type ReactNode, useEffect } from 'react';

import { NO_ENDPOINT, STORE_RESET } from '@/common/constants';
import { LocalStorageKeys, ProtectedPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useScopedI18n } from '@/locales/client';
import { decodeBase64 } from '@/utils/utils';

import styles from './History.module.scss';

function History(): ReactNode {
  const { getStoredValue } = useLocalStorage();
  const requests = (getStoredValue(LocalStorageKeys.REQUEST_LIST) as string[]) || [];
  const translate = useScopedI18n('history');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: STORE_RESET });
  }, [dispatch]);

  return (
    <div className={styles.historyPage}>
      <h1 className={styles.historyTitle}>{translate('title')}</h1>
      {requests.length === 0 ? (
        <div className={styles.noRequests}>
          <h2>{translate('empty.title')}</h2>
          <p>{translate('empty')}</p>
          <div className={styles.buttonGroup}>
            <Link href={ProtectedPaths.REST}>{translate('links.rest')}</Link>
            <Link href={ProtectedPaths.GRAPHQL}>{translate('links.graphql')}</Link>
          </div>
        </div>
      ) : (
        <div className={styles.requests}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{translate('subtitle')}</h2>
            <div className={styles.requestRows}>
              {requests.map((request, index) => {
                let coryRequest = request;
                const questionMarkIndex = coryRequest.indexOf('?');
                if (questionMarkIndex !== -1) {
                  coryRequest = coryRequest.substring(0, questionMarkIndex);
                }
                const pathParts = coryRequest.split('/');
                const methodParam = pathParts[4] || '';
                const encodedEndpoint = pathParts[5] || '';
                const decodedEndpoint = encodedEndpoint === NO_ENDPOINT ? NO_ENDPOINT : decodeBase64(encodedEndpoint);
                const key = index;

                return (
                  <div key={key} className={styles.requestItem}>
                    <Link className={styles.oneLine} href={request}>
                      <p className={styles.method}>{`${methodParam}`}</p>
                      <p className={styles.url}>{`${decodedEndpoint}`}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthRoute(History);
