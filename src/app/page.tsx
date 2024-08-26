'use client';

import { type ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <h1>Main page</h1>
      <p>{user ? `Welcome back, ${user?.displayName}!` : 'Welcome, please sign in.'}</p>
    </div>
  );
}
