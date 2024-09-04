'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import * as React from 'react';

import { LocalStorageKeys, ProtectedPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { decodeBase64 } from '@/utils/utils';

import styles from './History.module.scss';

function History(): ReactNode {
  const example = JSON.parse(localStorage.getItem(LocalStorageKeys.URLS_RSS_REQUEST) || '[]') as string[];

  const [requests, setRequests] = React.useState<string[]>(example);

  React.useEffect(() => {
    const storedRequests = localStorage.getItem(LocalStorageKeys.URLS_RSS_REQUEST);
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests) as string[];
      setRequests(parsedRequests);
    }
  }, []);
  return (
    <div className={styles.historyPage}>
      <h1 className={styles.historyTitle}>History</h1>
      {requests.length === 0 ? (
        <div className={styles.noRequests}>
          <h2>You haven&apos;t executed any requests</h2>
          <p>It&apos;s empty here. Try: </p>
          <div className={styles.buttonGroup}>
            <Link href={ProtectedPaths.REST}>REST Client</Link>
            <Link href={ProtectedPaths.GRAPHQL}>GraphiQL Client</Link>
          </div>
        </div>
      ) : (
        <div className={styles.requests}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}> Requests:</h2>
            <div className={styles.requestsStrings}>
              {requests.map((request) => {
                const pathParts = request.split('/');
                const methodParam = pathParts[2] || '';
                const encodedEndpoint = pathParts[3] || '';
                const decodedEndpoint = decodeBase64(encodedEndpoint);

                return (
                  <div key={request} className={styles.requestItem}>
                    <Link className={styles.oneLine} href={request}>
                      <div>{`[${methodParam}`}</div>
                      <div>{`${decodedEndpoint}]`}</div>
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
