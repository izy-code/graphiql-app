import type { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import type { RootState } from '@/store/store';

import styles from './SchemaContainer.module.scss';

export default function SchemaContainer(): ReactNode {
  const { currentSchema, isSchemaShown } = useAppSelector((state: RootState) => state.graphql);

  return (
    isSchemaShown && (
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Schema docs:</h2>
        <pre>{JSON.stringify(currentSchema, null, 2)}</pre>
      </div>
    )
  );
}
