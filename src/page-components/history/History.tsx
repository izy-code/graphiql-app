'use client';

import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import { ProtectedPaths } from '@/common/enums.ts';
import { AuthRoute } from '@/components/auth-route/AuthRoute';

import styles from './History.module.scss';

function History(): ReactNode {
  const example = ['http://localhost:3000/GET', 'http://localhost:3000/POST', 'http://localhost:3000/DELETE'];
  const [requests] = useState(example);

  return (
    <div className={styles.historyPage}>
      <h1 className={styles.historyTitle}>History</h1>
      {requests.length === 0 ? (
        <div className={styles.noRequests}>
          <h2>You haven’t executed any requests</h2>
          <p>It’s empty here. Try: </p>
          <div className={styles.buttonGroup}>
            <Link href={ProtectedPaths.REST}>REST Client</Link>
            <Link href={ProtectedPaths.GRAPHIQL}>GraphiQL Client</Link>
          </div>
        </div>
      ) : (
        <div className={styles.requests}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}> Requests:</h2>
            <div className={styles.requestsStrings}>
              {requests.map((request) => (
                <div key={request} className={styles.requestItem}>
                  {request}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthRoute(History);
