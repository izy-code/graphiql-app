import { type ReactNode } from 'react';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <div className={styles.page}>
      <h1>REST/GraphiQL client</h1>
    </div>
  );
}
