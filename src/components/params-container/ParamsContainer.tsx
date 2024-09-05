import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import CustomTextarea from '@/components/custom-textarea/CustomTextarea.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks.ts';
import { useEncodeUrl } from '@/hooks/useEncodeUrl.ts';
import { setHeaders, setQuery, setVariables } from '@/store/graphql-slice/graphql-slice.ts';
import type { RootState } from '@/store/store';

import ClientTable from '../client-table/ClientTable.tsx';
import type { IData } from '../client-table/types.ts';
import styles from './ParamsContainer.module.scss';

export default function ParamsContainer(): ReactNode {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { query, variables, headers } = useAppSelector((state: RootState) => state.graphql);
  const { replaceUrl, getEncodedHeaders, getEncodedRequestBody, getEncodedEndpoint } = useEncodeUrl();

  const handleJsonEditorBlur = (): void => {
    if (!query && !variables) {
      replaceUrl(`${getEncodedEndpoint()}${getEncodedHeaders()}`);
      return;
    }

    replaceUrl(`${getEncodedEndpoint()}/${getEncodedRequestBody()}${getEncodedHeaders()}`);
  };

  const handleHeadersChange = (changedHeaders: IData[]): void => {
    dispatch(setHeaders(changedHeaders));

    replaceUrl(getEncodedHeaders(changedHeaders), pathname);
  };

  return (
    <div className={styles.section}>
      <div className={styles.item}>
        <h4>Query: </h4>
        <CustomTextarea
          label="Query"
          value={query}
          width="100%"
          onBlur={handleJsonEditorBlur}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
      </div>

      <h2 className={styles.sectionTitle}>Params</h2>
      <ClientTable title="Headers" tableInfo={headers} onChange={handleHeadersChange} />
      <div className={styles.item}>
        <h4>Variables: </h4>
        <CustomTextarea
          label="Variables"
          value={variables}
          width="100%"
          onBlur={handleJsonEditorBlur}
          onChange={(e) => dispatch(setVariables(e.target.value))}
        />
      </div>
    </div>
  );
}
