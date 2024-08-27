'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

import { NonProtectedPaths, ProtectedPaths } from '@/common/enums';
import { useAuth } from '@/hooks/useAuth';

import styles from './Main.module.scss';

export default function Main(): ReactNode {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <h1>REST/GraphiQL client</h1>
      <p>{user ? `Welcome back, ${user?.displayName}!` : 'Welcome, please sign in.'}</p>
      <div className={styles.links}>
        {user ? (
          <>
            <Link href={ProtectedPaths.REST}>REST Client</Link>
            <Link href={ProtectedPaths.GRAPHIQL}>GraphiQL Client</Link>
            <Link href={ProtectedPaths.HISTORY}>History</Link>
          </>
        ) : (
          <>
            <Link href={NonProtectedPaths.SIGN_IN}>Sign in</Link>
            <Link href={NonProtectedPaths.SIGN_UP}>Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
