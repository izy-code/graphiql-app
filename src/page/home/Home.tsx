'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

import { NonProtectedPaths, ProtectedPaths } from '@/common/enums';
import { useAuth } from '@/store/authSlice';

import styles from './styles.module.scss';

export function Home(): ReactNode {
  const isAuthenticated = useAuth();

  return (
    <div className={styles.page}>
      <h1>REST/GraphiQL client</h1>
      <p>{isAuthenticated ? `Welcome Back, [Username]!` : `Welcome!`}</p>
      <div className={styles.links}>
        {isAuthenticated ? (
          <>
            <Link href={ProtectedPaths.REST}>REST Client</Link>
            <Link href={ProtectedPaths.GRAPHIQL}>GraphiQL Client</Link>
            <Link href={ProtectedPaths.HISTORY}>History</Link>
          </>
        ) : (
          <>
            <Link href={NonProtectedPaths.LOGIN}>Sign in</Link>
            <Link href={NonProtectedPaths.REGISTER}>Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
