import 'graphiql/graphiql.min.css';

import { DocExplorer, GraphiQLProvider, useTheme as useSchemaTheme } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import clsx from 'clsx';
import { type ReactNode, useEffect, useMemo } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import { useScopedI18n } from '@/locales/client';
import type { RootState } from '@/store/store';

import styles from './SchemaContainer.module.scss';

export function SchemaContainer(): ReactNode {
  const { currentSchema, isSchemaShown } = useAppSelector((state: RootState) => state.graphql);
  const { setTheme } = useSchemaTheme();
  const translate = useScopedI18n('schema');

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const fetcher = useMemo(
    () =>
      createGraphiQLFetcher({
        url: 'http://stub.com',
      }),
    [],
  );

  return (
    isSchemaShown && (
      <div className={clsx(styles.section, 'graphiql-container')}>
        <h2 className={styles.sectionTitle}>{translate('title')}</h2>
        <GraphiQLProvider fetcher={fetcher} schema={currentSchema}>
          <DocExplorer />
        </GraphiQLProvider>
      </div>
    )
  );
}
