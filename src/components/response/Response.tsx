import type { ReactNode } from 'react';

import styles from './Response.module.scss';

export function Response(): ReactNode {
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.setting}> Status:</span>
        <span className={styles.answer}> 500 </span>
      </div>
      <div>
        <span className={styles.setting}> Body:</span>
        <span className={styles.answer}> [Read-Only JSON Viewer] </span>
      </div>
    </div>
  );
}
