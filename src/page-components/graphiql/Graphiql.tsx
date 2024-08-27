'use client';

import { type ReactNode } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';

import styles from './Graphiql.module.scss';

function GraphiQl(): ReactNode {
  return (
    <div className={styles.page}>
      <h2>GraphiQL page</h2>
    </div>
  );
}

export default AuthRoute(GraphiQl);
