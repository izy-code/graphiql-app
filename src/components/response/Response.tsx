'use client';

import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import * as React from 'react';

import styles from './Response.module.scss';

export function Response(): ReactNode {
  const [status] = React.useState(200);
  const [responseBody] = React.useState('{}');

  return (
    <div className={styles.container}>
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
  );
}
