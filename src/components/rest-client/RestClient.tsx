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
        <h2 className={styles.sectionTitle}>URL</h2>
        <MethodButtons />
        <CustomInput label="Endpoint URL" variant="standard" width="420px" />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Params</h2>
        <TableHeaders />
        <div className={styles.item}>Body: [JSON/Text Editor]</div>
      </div>
    </div>
  );
}
