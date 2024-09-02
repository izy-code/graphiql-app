'use client';

import Box from '@mui/material/Box';
import { type ReactNode, useState } from 'react';
import * as React from 'react';
import { toast } from 'react-toastify';

import { makeRequest, makeRequest1 } from '@/common/graphQlApi.ts';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { CustomButton } from '@/components/custom-button/CustomButton.tsx';

import CustomInput from '../../components/custom-input/CustomInput.tsx';
import CustomTextarea from '../../components/custom-textarea/CustomTextarea.tsx';
import TableHeaders from '../../components/table-headers/TableHeaders.tsx';
import styles from './Graphql.module.scss';

function GraphQl(): ReactNode {
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [variables, setVariables] = useState('');
  const [status] = useState(200);
  const [responseBody] = useState('{}');

  const onRequest = async () => {
    if (query) {
      const { data, error } = await makeRequest(url, { query });

      if (error && error instanceof Error) {
        toast.error(error.message);
      }
      if (data) {
        const code = JSON.stringify(data, null, 2);
        console.log(data, code);
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>GraphiQl Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <CustomInput label="Endpoint URL" variant="standard" width="420px" onChange={(e) => setUrl(e.target.value)} />
          <CustomInput label="SDL URL" variant="standard" width="420px" />
          <CustomButton onClick={onRequest}>Request</CustomButton>
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
    </div>
  );
}

export default AuthRoute(GraphQl);
