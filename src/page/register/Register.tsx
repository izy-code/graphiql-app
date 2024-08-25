'use client';

import { type ReactNode } from 'react';

import { NonAuthRoute } from '@/components/non-auth-route/NonAuthRoute';

import styles from './styles.module.scss';

function Register(): ReactNode {
  return (
    <div className={styles.page}>
      <h2>Register page</h2>
    </div>
  );
}

export default NonAuthRoute(Register);
