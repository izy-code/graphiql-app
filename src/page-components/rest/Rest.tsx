'use client';

import Box from '@mui/material/Box';
import { type ReactNode, useState } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import ClientTable from '@/components/client-table/ClientTable';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';

import styles from './Rest.module.scss';

function Rest(): ReactNode {
  const [body, setBody] = useState('');
  const [status] = useState(200);
  const [responseBody] = useState('{}');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>REST Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <MethodButtons />
          <CustomInput label="Endpoint URL" variant="standard" width="420px" value="" />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Params</h2>
          <ClientTable title="Headers" tableInfo={[]} onChange={() => {}} />
          <div className={styles.item}>
            <CustomTextarea editorMode="json" titleText="Body: " value={body} onChange={(value) => setBody(value)} />
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Response</h2>
        <div className={styles.oneLine}>
          <h4>Status:</h4>
          {status}
        </div>
        <div>
          <h4>Body:</h4>
          <Box component="pre" sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: '200px', overflow: 'auto' }}>
            {responseBody}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AuthRoute(Rest);
