import type { ReactNode } from 'react';

import { ClientTable } from '@/components/client-table/ClientTable';
import { CustomTextarea } from '@/components/custom-textarea/CustomTextarea';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useEncodeUrl } from '@/hooks/useEncodeUrl';
import { useScopedI18n } from '@/locales/client';
import { setHeaders, setQuery, setVariables } from '@/store/graphql-slice/graphql-slice';
import type { RootState } from '@/store/store';

import type { TableRow } from '../client-table/types';
import styles from './GraphqlParamsContainer.module.scss';

export function GraphqlParamsContainer(): ReactNode {
  const dispatch = useAppDispatch();
  const { query, variables, headers } = useAppSelector((state: RootState) => state.graphql);
  const { replaceUrl } = useEncodeUrl();
  const translate = useScopedI18n('graphql');

  const handleHeadersChange = (changedHeaders: TableRow[]): void => {
    dispatch(setHeaders(changedHeaders));
    replaceUrl({ headersParam: changedHeaders });
  };

  return (
    <div className={styles.section}>
      <div className={styles.item}>
        <CustomTextarea
          editorMode="graphql"
          titleText={translate('query.title')}
          value={query}
          width="100%"
          hasHideBtn={false}
          onBlur={() => replaceUrl()}
          onChange={(value) => dispatch(setQuery(value))}
        />
      </div>

      <h2 className={styles.sectionTitle}>{translate('params')}</h2>
      <ClientTable title={translate('headers')} tableInfo={headers} onChange={handleHeadersChange} />
      <div className={styles.item}>
        <CustomTextarea
          editorMode="json-with-linter"
          titleText={translate('variables.title')}
          value={variables}
          width="100%"
          onBlur={() => replaceUrl()}
          onChange={(value) => dispatch(setVariables(value))}
        />
      </div>
    </div>
  );
}
