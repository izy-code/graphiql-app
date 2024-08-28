'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import * as React from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';

import { CustomMuiButton } from '../../components/custom-mui-button/CustomMuiButton.tsx';
import styles from './History.module.scss';

function History(): ReactNode {
  const example = ['http://localhost:3000/GET', 'http://localhost:3000/POST', 'http://localhost:3000/DELETE'];
  const router = useRouter();
  const [requests] = React.useState<string[]>(example);

  return (
    <div className={styles.welcome}>
      <h1 className={styles.welcomeTitle}>History</h1>
      {requests.length === 0 ? (
        <div className={styles.noRequests}>
          <h2>You haven&apos;t executed any requests</h2>
          <p>It&apos;s empty here. Try: </p>
          <div className={styles.buttonGroup}>
            <CustomMuiButton onClick={() => router.push('/rest')}>REST Client</CustomMuiButton>
            <CustomMuiButton onClick={() => router.push('/graph')}>GraphiQL Client</CustomMuiButton>
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
