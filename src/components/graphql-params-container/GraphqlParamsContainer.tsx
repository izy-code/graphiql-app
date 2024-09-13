import type { ReactNode } from 'react';

import CustomTextarea from '@/components/custom-textarea/CustomTextarea.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks.ts';
import { useEncodeUrl } from '@/hooks/useEncodeUrl.ts';
import { setHeaders, setQuery, setVariables } from '@/store/graphql-slice/graphql-slice.ts';
import type { RootState } from '@/store/store';

import ClientTable from '../client-table/ClientTable.tsx';
import type { TableRow } from '../client-table/types.ts';
import styles from './GraphqlParamsContainer.module.scss';

export default function GraphqlParamsContainer(): ReactNode {
  const dispatch = useAppDispatch();
  const { query, variables, headers } = useAppSelector((state: RootState) => state.graphql);
  const { replaceUrl } = useEncodeUrl();

  const handleHeadersChange = (changedHeaders: TableRow[]): void => {
    dispatch(setHeaders(changedHeaders));
    replaceUrl({ headersParam: changedHeaders });
  };

  return (
    <div className={styles.section}>
      <div className={styles.item}>
        <CustomTextarea
          editorMode="graphql"
          titleText="Query: "
          value={query}
          width="100%"
          hasHideBtn={false}
          onBlur={() => replaceUrl()}
          onChange={(value) => dispatch(setQuery(value))}
        />
      </div>

      <h2 className={styles.sectionTitle}>Params</h2>
      <ClientTable title="Headers" tableInfo={headers} onChange={handleHeadersChange} />
      <div className={styles.item}>
        <CustomTextarea
          editorMode="json-with-linter"
          titleText="Variables: "
          value={variables}
          width="100%"
          onBlur={() => replaceUrl()}
          onChange={(value) => dispatch(setVariables(value))}
        />
      </div>
    </div>
  );
}
