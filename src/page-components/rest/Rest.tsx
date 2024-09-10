'use client';

import Box from '@mui/material/Box';
import { type ReactNode, useState } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';
import TableHeaders from '@/components/table-headers/TableHeaders';
import { useScopedI18n } from '@/locales/client';

import styles from './Rest.module.scss';

function Rest(): ReactNode {
  const [body, setBody] = useState('');
  const [status] = useState(200);
  const [responseBody] = useState('{}');
  const translate = useScopedI18n('rest');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{translate('title')}</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <MethodButtons />
          <CustomInput label={translate('endpoint')} variant="standard" width="420px" />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{translate('params')}</h2>
          <TableHeaders />
          <div className={styles.item}>
            <h4>{translate('body.title')}</h4>
            <CustomTextarea
              label={translate('body')}
              value={body}
              width="500px"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{translate('response')}</h2>
        <div className={styles.oneLine}>
          <h4>{translate('status')}</h4>
          {status}
        </div>
        <div>
          <h4>{translate('body.title')}</h4>
          <Box component="pre" sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: '200px', overflow: 'auto' }}>
            {responseBody}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AuthRoute(Rest);
