'use client';

import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import * as React from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { ObjectWithId } from '@/components/client-table/types.ts';

import ClientTable from '../../components/client-table/ClientTable.tsx';
import CustomInput from '../../components/custom-input/CustomInput.tsx';
import CustomTextarea from '../../components/custom-textarea/CustomTextarea';
import styles from './Graphiql.module.scss';

function GraphiQl(): ReactNode {
  const [query, setQuery] = React.useState('');
  const [variables, setVariables] = React.useState('');
  const [status] = React.useState(200);
  const [responseBody] = React.useState('{}');
  const [endpoint, setEndpoint] = React.useState('');
  const [sdl, setSdl] = React.useState('');
  const [headers, setHeaders] = React.useState<ObjectWithId[]>([]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>GraphiQl Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <CustomInput
            label="Endpoint URL"
            variant="standard"
            value={endpoint}
            width="420px"
            onChange={(e) => setEndpoint(e.target.value)}
          />
          <CustomInput
            label="SDL URL"
            variant="standard"
            value={sdl}
            width="420px"
            onChange={(e) => setSdl(e.target.value)}
          />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Params</h2>
          <ClientTable title="Headers" tableInfo={headers} onChange={setHeaders} />
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
    </div>
  );
}

export default AuthRoute(GraphiQl);
