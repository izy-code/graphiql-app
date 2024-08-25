'use client';

import { type ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase/firebase';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  const [user, loading] = useAuthState(auth);

  return (
    <div className={styles.page}>
      <h1>Main page</h1>
      {loading ? (
        <p>Loading firebase...</p>
      ) : (
        <p>{user ? `Welcome back, ${user?.displayName}!` : 'Welcome, please sign in.'}</p>
      )}
    </div>
  );
}
