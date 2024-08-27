'use client';

import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import * as React from 'react';

import CustomInput from '../custom-input/CustomInput';
import CustomTextarea from '../custom-textarea/CustomTextarea';
import TableHeaders from '../table-headers/TableHeaders';
import styles from './Graphiql.module.scss';

export function Graphiql(): ReactNode {
  const [query, setQuery] = React.useState('');
  const [variables, setVariables] = React.useState('');
  const [status] = React.useState(200);
  const [responseBody] = React.useState('{}');

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>GraphiQL Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <CustomInput label="Endpoint URL" variant="standard" width="420px" />
          <CustomInput label="SDL URL" variant="standard" width="420px" />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Params</h2>
          <TableHeaders />
          <div className={styles.item}>
            <h4>Query: </h4>
            <CustomTextarea label="Query" value={query} width="500px" onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className={styles.item}>
            <h4>Variables: </h4>
            <CustomTextarea
              label="Variables"
              value={variables}
              width="500px"
              onChange={(e) => setVariables(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Response</h2>
        <div className={styles.oneLine}>
          <h4>Status:</h4>
          {status}
        </div>
        <div className={styles.body}>
          <h4>Body:</h4>
          <Box component="pre" sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: '400px', overflow: 'auto' }}>
            {responseBody}
          </Box>
        </div>
      </div>
    </>
  );
}
