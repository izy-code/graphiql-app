import type { ReactNode } from 'react';

import TableExample from '../table-example/TableExample';
import styles from './Response.module.scss';

export function Response(): ReactNode {
  return (
    <div className={styles.container}>
      <TableExample />
    </div>
  );
}
