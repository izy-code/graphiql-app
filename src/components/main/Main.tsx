import type { ReactNode } from 'react';

import { RestClient } from '../rest-client/RestClient';
import styles from './Main.module.scss';

export function Main(): ReactNode {
  return (
    <main className="main">
      <div className={styles.container}>
        <RestClient />
      </div>
    </main>
  );
}
