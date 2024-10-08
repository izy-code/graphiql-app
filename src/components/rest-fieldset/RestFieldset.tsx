import type { ReactNode } from 'react';

import { ClientTable } from '@/components/client-table/ClientTable';
import type { TableRow } from '@/components/client-table/types';
import { CustomInput } from '@/components/custom-input/CustomInput';
import { CustomTextarea } from '@/components/custom-textarea/CustomTextarea';
import { MethodButtons } from '@/components/method-buttons/MethodButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import {
  setBody,
  setEndpoint,
  setHeaders,
  setIsPlainText,
  setIsShowResponse,
  setMethod,
  setVariables,
} from '@/store/rest-slice/rest-slice';
import type { RootState } from '@/store/store';
import { generateUniqueId, updateHistory } from '@/utils/utils';

import RequestButton from '../request-button/RequestButton';
import styles from './RestFieldset.module.scss';

export function RestFieldset(): ReactNode {
  const { endpoint, method, body, headers, variables, isPlainText } = useAppSelector((state: RootState) => state.rest);
  const dispatch = useAppDispatch();
  const locale = useCurrentLocale();
  const translate = useScopedI18n('rest');

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newEndpoint = e.target.value;
    dispatch(setEndpoint(newEndpoint));
    updateHistory(locale, method, newEndpoint, body, headers, variables);
    dispatch(setIsShowResponse(false));
  };

  const handleMethodChange = (newMethod: string): void => {
    dispatch(setMethod(newMethod.toUpperCase()));
    updateHistory(locale, newMethod, endpoint, body, headers, variables);
    dispatch(setIsShowResponse(false));
  };

  const handleBodyBlur = (): void => {
    updateHistory(locale, method, endpoint, body, headers, variables);
    dispatch(setIsShowResponse(false));
  };

  const handleHeaderChange = (newHeaders: TableRow[]): void => {
    dispatch(setHeaders(newHeaders));
    updateHistory(locale, method, endpoint, body, newHeaders, variables);
    dispatch(setIsShowResponse(false));
  };

  const handleVariablesChange = (newVariables: TableRow[]): void => {
    dispatch(setVariables(newVariables));
    updateHistory(locale, method, endpoint, body, headers, newVariables);
    dispatch(setIsShowResponse(false));
  };

  const handleSwitchChange = (): void => {
    const filteredHeaders = headers.filter((header) => header.key !== 'Content-Type');

    const newContentType = !isPlainText
      ? { id: generateUniqueId(), key: 'Content-Type', value: 'text/plain' }
      : { id: generateUniqueId(), key: 'Content-Type', value: 'application/json' };

    const updatedHeaders = [newContentType, ...filteredHeaders];
    updateHistory(locale, method, endpoint, body, updatedHeaders, variables);

    dispatch(setHeaders(updatedHeaders));
    dispatch(setIsPlainText(!isPlainText));
  };

  return (
    <>
      <div className={styles.items}>
        <h2 className={styles.sectionTitle}>URL</h2>
        <div className={styles.oneLine}>
          <MethodButtons method={method} onMethodChange={handleMethodChange} />
          <CustomInput
            label={translate('endpoint')}
            variant="outlined"
            width="420px"
            value={endpoint}
            onChange={handleEndpointChange}
          />
        </div>
        <RequestButton />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{translate('params')}</h2>
        <ClientTable title={translate('headers')} tableInfo={headers} onChange={handleHeaderChange} />
        <ClientTable title={translate('variables')} tableInfo={variables} onChange={handleVariablesChange} />
        <div className={styles.item}>
          <CustomTextarea
            editorMode="json"
            titleText={translate('body.title')}
            value={body}
            onChange={(value) => dispatch(setBody(value))}
            onBlur={handleBodyBlur}
            hasSwitcher
            isPlainText={isPlainText}
            onSwitchChange={handleSwitchChange}
          />
        </div>
      </div>
    </>
  );
}
