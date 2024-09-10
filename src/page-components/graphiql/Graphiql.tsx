'use client';

import Box from '@mui/material/Box';
import { type ReactNode, useState } from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { useScopedI18n } from '@/locales/client';

import CustomInput from '../../components/custom-input/CustomInput.tsx';
import CustomTextarea from '../../components/custom-textarea/CustomTextarea';
import TableHeaders from '../../components/table-headers/TableHeaders';
import styles from './Graphiql.module.scss';

function GraphiQl(): ReactNode {
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [status] = useState(200);
  const [responseBody] = useState('{}');
  const translate = useScopedI18n('graphiql');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{translate('title')}</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <CustomInput label={translate('endpoint')} variant="standard" width="420px" />
          <CustomInput label={translate('sdl')} variant="standard" width="420px" />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{translate('params')}</h2>
          <TableHeaders />
          <div className={styles.item}>
            <h4>{translate('query.title')}</h4>
            <CustomTextarea
              label={translate('query')}
              value={query}
              width="500px"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <h4>{translate('variables.title')}</h4>
            <CustomTextarea
              label={translate('variables')}
              value={variables}
              width="500px"
              onChange={(e) => setVariables(e.target.value)}
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
        <div className={styles.body}>
          <h4>{translate('body.title')}</h4>
          <Box component="pre" sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: '400px', overflow: 'auto' }}>
            {responseBody}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AuthRoute(GraphiQl);
