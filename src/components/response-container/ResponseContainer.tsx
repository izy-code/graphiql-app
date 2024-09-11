import Box from '@mui/material/Box';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import type { RootState } from '@/store/store';

import styles from './ResponseContainer.module.scss';

interface ResponseContainerProps {
  type: 'graphql' | 'rest';
}
export default function ResponseContainer({ type }: ResponseContainerProps): ReactNode {
  const { status, responseBody } = useAppSelector((state: RootState) =>
    type === 'graphql' ? state.graphql : state.rest,
  );
  return (
    <div className={clsx(styles.section, styles.response)}>
      <h2 className={styles.sectionTitle}>Response</h2>
      <div className={styles.oneLine}>
        <h4>Status:</h4>
        {status}
      </div>
      <div className={styles.body}>
        <h4>Body:</h4>
        <Box
          component="pre"
          sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: '400px', overflow: 'auto', width: '100%' }}
        >
          {responseBody}
        </Box>
      </div>
    </div>
  );
}
