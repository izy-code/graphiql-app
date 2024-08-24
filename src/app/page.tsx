import Link from 'next/link';
import { type ReactNode } from 'react';

import { isAuthenticated } from '@/utils/utils';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <div className={styles.page}>
      <h1>REST/GraphiQL client</h1>
      <p>{isAuthenticated ? `Welcome Back, [Username]!` : `Welcome!`}</p>
      <div className={styles.links}>
        {isAuthenticated ? (
          <>
            <Link href="/rest">REST Client</Link>
            <Link href="/graphiql">GraphiQL Client</Link>
            <Link href="/history">History</Link>
          </>
        ) : (
          <>
            <Link href="/login">Sign in</Link>
            <Link href="/register">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
