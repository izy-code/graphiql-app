'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

import { LocalStorageKeys, ProtectedPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { decodeBase64 } from '@/utils/utils';

import styles from './History.module.scss';

function History(): ReactNode {
  const { getStoredValue } = useLocalStorage();
  const requests = (getStoredValue(LocalStorageKeys.REQUEST_LIST) as string[]) || [];

  return (
    <div className={styles.historyPage}>
      <h1 className={styles.historyTitle}>History</h1>
      {requests.length === 0 ? (
        <div className={styles.noRequests}>
          <h2>{`You haven't executed any requests`}</h2>
          <p>{`It's empty here. Try: `}</p>
          <div className={styles.buttonGroup}>
            <Link href={ProtectedPaths.REST}>REST Client</Link>
            <Link href={ProtectedPaths.GRAPHQL}>GraphiQL Client</Link>
          </div>
        </div>
      ) : (
        <div className={styles.requests}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}> Requests:</h2>
            <div className={styles.requestRows}>
              {requests.map((request, index) => {
                const url = new URL(request);
                const pathParts = url.pathname.split('/');
                const methodParam = pathParts[2] || '';
                const encodedEndpoint = pathParts[3] || '';
                const decodedEndpoint = decodeBase64(encodedEndpoint);
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
