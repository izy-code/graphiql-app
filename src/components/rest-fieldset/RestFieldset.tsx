import { Button } from '@mui/material';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { LocalStorageKeys } from '@/common/enums.ts';
import { getResponse } from '@/common/restApi.ts';
import ClientTable from '@/components/client-table/ClientTable';
import type { ObjectWithId } from '@/components/client-table/types.ts';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks.ts';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';
import { useCurrentLocale } from '@/locales/client';
import {
  setBody,
  setEndpoint,
  setHeaders,
  setMethod,
  setResponseBody,
  setStatus,
  setVariables,
} from '@/store/rest-slice/rest-slice.ts';
import type { RootState } from '@/store/store';
import { encodeBase64 } from '@/utils/utils.ts';

import styles from './RestFieldset.module.scss';

const replaceVariables = (text: string, variables: ObjectWithId[]): string => {
  const variableMap = Object.fromEntries(
    variables.filter(({ key, value }) => key.trim() && value.trim()).map(({ key, value }) => [key, value]),
  );

  let result = text;
  Object.entries(variableMap).forEach(([variableKey, variableValue]) => {
    const variablePlaceholder = `{{${variableKey}}}`;
    result = result.replace(new RegExp(variablePlaceholder, 'g'), variableValue);
  });

  return result.trim();
};

const getEncodedHeaders = (headersParameter: ObjectWithId[]): string => {
  if (!headersParameter || headersParameter.length === 0) {
    return '';
  }

  const encodedHeaders = headersParameter
    .filter(({ key, value }) => key.trim() && value.trim())
    .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

  return `?${encodedHeaders.join('&')}`;
};

const updateHistory = (
  locale: string,
  method: string,
  endpoint: string,
  body: string,
  headers: ObjectWithId[],
  variables: ObjectWithId[],
): void => {
  const encodedEndpoint = endpoint ? encodeBase64(endpoint) : encodeBase64(' ');
  const encodedBody = encodeBase64(replaceVariables(body, variables) || ' ');
  const encodedHeaders = getEncodedHeaders(headers);

  window.history.replaceState(null, '', `/${locale}/${method}/${encodedEndpoint}/${encodedBody}${encodedHeaders}`);
};

export default function RestFieldset(): ReactNode {
  const { endpoint, method, body, headers, variables } = useAppSelector((state: RootState) => state.rest);
  const dispatch = useAppDispatch();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const locale = useCurrentLocale();

  const handleRequest = async (): Promise<void> => {
    dispatch(setStatus(''));
    dispatch(setResponseBody(''));
    const { status: statusCode, data, errorMessage } = await getResponse(method, endpoint, headers, body, variables);
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(setStatus(statusCode!));
      return;
    }

    dispatch(setStatus(statusCode!.toString()));
    dispatch(setResponseBody(JSON.stringify(data, null, 2)));
    toast.info('The request has been completed, look at the response body');
    window.history.pushState(null, '', window.location.href);

    const requestsArray = (getStoredValue(LocalStorageKeys.URLS_RSS_REQUEST) as string[]) || [];
    setStoredValue(LocalStorageKeys.URLS_RSS_REQUEST, [window.location.href, ...requestsArray]);
  };

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
        <div className={styles.center}>
          <Button className={styles.button} variant="contained" color="primary" onClick={handleRequest}>
            Send Request
          </Button>
        </div>
      </div>
    </>
  );
}
