import type { ReactNode } from 'react';

import CustomInput from '../custom-input/CustomInput';
import MethodButtons from '../method-buttons/MethodButtons';
import TableHeaders from '../table-headers/TableHeaders';
import styles from './RestClient.module.scss';

export function RestClient(): ReactNode {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>REST Client</h1>
      <div className={styles.items}>
        <MethodButtons />
        <CustomInput label="Endpoint URL" />
      </div>
      <div className={styles.item}>
        <h4 className={styles.subtitle}>Headers:</h4>
        <TableHeaders />
      </div>
      <div className={styles.item}>Body: [JSON/Text Editor]</div>
    </div>
  );
}
