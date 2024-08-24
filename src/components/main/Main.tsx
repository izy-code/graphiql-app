import type { ReactNode } from 'react';

import { Response } from '../response/Response';
import { RestClient } from '../rest-client/RestClient';
import styles from './Main.module.scss';

export function Main(): ReactNode {
  return (
    <main className="main">
      <div className={styles.container}>
        <RestClient />
        <Response />
      </div>
    </main>
  );
}
