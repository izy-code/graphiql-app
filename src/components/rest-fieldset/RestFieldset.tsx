import type { ReactNode } from 'react';

import { ClientTable } from '@/components/client-table/ClientTable';
import type { ObjectWithId } from '@/components/client-table/types';
import { CustomInput } from '@/components/custom-input/CustomInput';
import { CustomTextarea } from '@/components/custom-textarea/CustomTextarea';
import { MethodButtons } from '@/components/method-buttons/MethodButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { setBody, setEndpoint, setHeaders, setMethod, setVariables } from '@/store/rest-slice/rest-slice';
import type { RootState } from '@/store/store';
import { updateHistory } from '@/utils/utils';

import RequestButton from '../request-button/RequestButton';
import styles from './RestFieldset.module.scss';

export function RestFieldset(): ReactNode {
  const { endpoint, method, body, headers, variables } = useAppSelector((state: RootState) => state.rest);
  const dispatch = useAppDispatch();
  const locale = useCurrentLocale();
  const translate = useScopedI18n('rest');

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
          label={translate('endpoint')}
          variant="standard"
          width="420px"
          value={endpoint}
          onChange={handleEndpointChange}
        />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{translate('params')}</h2>
        <ClientTable title={translate('headers')} tableInfo={headers} onChange={handleHeaderChange} />
        <ClientTable title={translate('variables')} tableInfo={variables} onChange={handleVariablesChange} />
        <div className={styles.item}>
          <h4>{translate('body.title')}</h4>
          <CustomTextarea
            label={translate('body')}
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
