import type { ReactNode } from 'react';

import ClientTable from '@/components/client-table/ClientTable';
import type { ObjectWithId } from '@/components/client-table/types.ts';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks.ts';
import { useCurrentLocale } from '@/locales/client';
import { setBody, setEndpoint, setHeaders, setMethod, setVariables } from '@/store/rest-slice/rest-slice.ts';
import type { RootState } from '@/store/store';
import { updateHistory } from '@/utils/utils.ts';

import RequestButton from '../request-button/RequestButton';
import styles from './RestFieldset.module.scss';

export default function RestFieldset(): ReactNode {
  const { endpoint, method, body, headers, variables } = useAppSelector((state: RootState) => state.rest);
  const dispatch = useAppDispatch();
  const locale = useCurrentLocale();

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newEndpoint = e.target.value;
    dispatch(setEndpoint(newEndpoint));
    updateHistory(locale, method, newEndpoint, body, headers, variables);
  };

  const handleMethodChange = (newMethod: string): void => {
    dispatch(setMethod(newMethod));
    updateHistory(locale, newMethod, endpoint, body, headers, variables);
  };

  const handleBodyBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    dispatch(setBody(e.target.value));
    updateHistory(locale, method, endpoint, e.target.value, headers, variables);
  };

  const handleHeaderChange = (newHeaders: ObjectWithId[]): void => {
    dispatch(setHeaders(newHeaders));
    updateHistory(locale, method, endpoint, body, newHeaders, variables);
  };

  const handleVariablesChange = (newVariables: ObjectWithId[]): void => {
    dispatch(setVariables(newVariables));
    updateHistory(locale, method, endpoint, body, headers, newVariables);
  };

  return (
    <>
      <div className={styles.items}>
        <h2 className={styles.sectionTitle}>URL</h2>
        <MethodButtons method={method} onMethodChange={handleMethodChange} />
        <CustomInput
          label="Endpoint URL"
          variant="standard"
          width="420px"
          value={endpoint}
          onChange={handleEndpointChange}
        />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Params</h2>
        <ClientTable title="Header" tableInfo={headers} onChange={handleHeaderChange} />
        <ClientTable title="Variable" tableInfo={variables} onChange={handleVariablesChange} />
        <div className={styles.item}>
          <h4>Body: </h4>
          <CustomTextarea
            label="Body"
            value={body}
            onChange={(e) => dispatch(setBody(e.target.value))}
            onBlur={handleBodyBlur}
          />
        </div>
        <RequestButton />
      </div>
    </>
  );
}
