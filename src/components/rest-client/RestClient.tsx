'use client';

import type { ReactNode } from 'react';
import * as React from 'react';

import CustomInput from '../custom-input/CustomInput';
import CustomTextarea from '../custom-textarea/CustomTextarea';
import MethodButtons from '../method-buttons/MethodButtons';
import TableHeaders from '../table-headers/TableHeaders';
import styles from './RestClient.module.scss';

export function RestClient(): ReactNode {
  const [body, setBody] = React.useState('');

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
        <div className={styles.item}>
          <h4>Body: </h4>
          <CustomTextarea label="Body" value={body} width="500px" onChange={(e) => setBody(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
