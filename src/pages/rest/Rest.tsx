'use client';

import { type ReactNode } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';

import styles from './Rest.module.scss';

function Rest(): ReactNode {
  return (
    <div className={styles.page}>
      <h2>REST page</h2>
    </div>
  );
}

export default AuthRoute(Rest);
