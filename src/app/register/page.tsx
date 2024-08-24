import { type ReactNode } from 'react';

import styles from './styles.module.scss';

export default function Page(): ReactNode {
  return (
    <div className={styles.page}>
      <h2>Register page</h2>
    </div>
  );
}
