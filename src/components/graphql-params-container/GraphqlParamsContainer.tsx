import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { ClientTable } from '@/components/client-table/ClientTable';
import type { ObjectWithId } from '@/components/client-table/types';
import { CustomTextarea } from '@/components/custom-textarea/CustomTextarea';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useEncodeUrl } from '@/hooks/useEncodeUrl';
import { useScopedI18n } from '@/locales/client';
import { setHeaders, setQuery, setVariables } from '@/store/graphql-slice/graphql-slice';
import type { RootState } from '@/store/store';

import styles from './GraphqlParamsContainer.module.scss';

export function GraphqlParamsContainer(): ReactNode {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { query, variables, headers } = useAppSelector((state: RootState) => state.graphql);
  const { replaceUrl, getEncodedHeaders, getEncodedRequestBody, getEncodedEndpoint } = useEncodeUrl();
  const translate = useScopedI18n('graphql');

  const handleJsonEditorBlur = (): void => {
    if (!query && !variables) {
      replaceUrl(`${getEncodedEndpoint()}${getEncodedHeaders()}`);
      return;
    }

    replaceUrl(`${getEncodedEndpoint()}/${getEncodedRequestBody()}${getEncodedHeaders()}`);
  };

  const handleHeadersChange = (changedHeaders: ObjectWithId[]): void => {
    dispatch(setHeaders(changedHeaders));

    replaceUrl(getEncodedHeaders(changedHeaders), pathname);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{translate('params')}</h2>

      <div className={styles.item}>
        <h4>{translate('query.title')}</h4>
        <CustomTextarea
          label={translate('query')}
          value={query}
          width="100%"
          onBlur={handleJsonEditorBlur}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
      </div>

      <ClientTable title={translate('headers')} tableInfo={headers} onChange={handleHeadersChange} />
      <div className={styles.item}>
        <h4>{translate('variables.title')}</h4>
        <CustomTextarea
          label={translate('variables')}
          value={variables}
          width="100%"
          onBlur={handleJsonEditorBlur}
          onChange={(e) => dispatch(setVariables(e.target.value))}
        />
      </div>
    </div>
  );
}
