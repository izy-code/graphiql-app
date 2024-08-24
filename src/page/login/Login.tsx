'use client';

import { type ReactNode } from 'react';

import { NonAuthRoute } from '@/components/non-auth-route/NonAuthRoute';

import styles from './styles.module.scss';

function Login(): ReactNode {
  return (
    <div className={styles.page}>
      <h2>Login page</h2>
    </div>
  );
}

export default NonAuthRoute(Login);
