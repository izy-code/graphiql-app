'use client';

import { type ReactNode } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';

import styles from './styles.module.scss';

function History(): ReactNode {
  return (
    <div className={styles.page}>
      <h2>History page</h2>
    </div>
  );
}

export default AuthRoute(History);
