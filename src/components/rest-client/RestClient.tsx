import type { ReactNode } from 'react';

import styles from './RestClient.module.scss';

export function RestClient(): ReactNode {
  return (
    <main className="main">
      <div className={styles.container}>
        <h2>REST Client</h2>
        <div className={styles.items}>
          <p>POST</p>
          <input type="text" />
        </div>
        <div className={styles.item}>
          <h4 className={styles.subtitle}>Headers:</h4>
          <span className={styles.setting}> Header Key -</span>
          <span className={styles.answer}> Header Value </span>
        </div>
        <div className={styles.item}>Body: [JSON/Text Editor]</div>
      </div>
    </main>
  );
}
