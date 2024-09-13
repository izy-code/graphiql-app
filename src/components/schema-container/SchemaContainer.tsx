import 'graphiql/graphiql.min.css';
import './doc-explorer.scss';

import { DocExplorer, GraphiQLProvider, useTheme as useSchemaTheme } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import clsx from 'clsx';
import { type ReactNode, useEffect, useMemo } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import type { RootState } from '@/store/store';

import styles from './SchemaContainer.module.scss';

export function SchemaContainer(): ReactNode {
  const { currentSchema, isSchemaShown } = useAppSelector((state: RootState) => state.graphql);
  const { setTheme } = useSchemaTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const fetcher = useMemo(() => createGraphiQLFetcher({ url: '' }), []);

  return (
    isSchemaShown && (
      <div className={clsx(styles.section, 'graphiql-container')}>
        <GraphiQLProvider fetcher={fetcher} schema={currentSchema}>
          <DocExplorer />
        </GraphiQLProvider>
      </div>
    )
  );
}
