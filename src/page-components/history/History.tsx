'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { useScopedI18n } from '@/locales/client';

import { CustomMuiButton } from '../../components/custom-mui-button/CustomMuiButton.tsx';
import styles from './History.module.scss';

function History(): ReactNode {
  const example = ['http://localhost:3000/GET', 'http://localhost:3000/POST', 'http://localhost:3000/DELETE'];
  const router = useRouter();
  const [requests] = useState(example);
  const translate = useScopedI18n('history');

  return (
    <div className={styles.historyPage}>
      <h1 className={styles.historyTitle}>{translate('title')}</h1>
      {requests.length === 0 ? (
        <div className={styles.noRequests}>
          <h2>{translate('empty.title')}</h2>
          <p>{translate('empty')}</p>
          <div className={styles.buttonGroup}>
            <CustomMuiButton onClick={() => router.push('/rest')}>{translate('links.rest')}</CustomMuiButton>
            <CustomMuiButton onClick={() => router.push('/graph')}>{translate('links.graphiql')}</CustomMuiButton>
          </div>
        </div>
      ) : (
        <div className={styles.requests}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{translate('subtitle')}</h2>
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
