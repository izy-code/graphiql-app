import type { ReactNode } from 'react';

import MethodButtons from '../method-buttons/MethodButtons';
import styles from './RestClient.module.scss';

export function RestClient(): ReactNode {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>REST Client</h1>
      <div className={styles.items}>
        <MethodButtons />
        <input type="text" />
      </div>
      <div className={styles.item}>
        <h4 className={styles.subtitle}>Headers:</h4>
        <span className={styles.setting}> Header Key -</span>
        <span className={styles.answer}> Header Value </span>
      </div>
      <div className={styles.item}>Body: [JSON/Text Editor]</div>
    </div>
  );
}
