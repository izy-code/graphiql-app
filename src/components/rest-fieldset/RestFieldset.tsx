import { Button } from '@mui/material';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { NO_ENDPOINT } from '@/common/constants.ts';
import { LocalStorageKeys } from '@/common/enums.ts';
import { getResponse } from '@/common/restApi.ts';
import ClientTable from '@/components/client-table/ClientTable';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks.ts';
import { useEncodeUrl } from '@/hooks/useEncodeUrl.ts';
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

export default function RestFieldset(): ReactNode {
  const { endpoint, method, body, headers, variables } = useAppSelector((state: RootState) => state.rest);
  const dispatch = useAppDispatch();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const { getEncodedHeaders, getEncodedRequestBody } = useEncodeUrl();
  const locale = useCurrentLocale();

  const handleEndpointChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEndpoint(evt.target.value));

    const encodedEndpoint = evt.target.value ? encodeBase64(evt.target.value) : NO_ENDPOINT;

    window.history.replaceState(
      null,
      '',
      `/${locale}/${method}/${encodedEndpoint}/${getEncodedRequestBody()}${getEncodedHeaders()}`,
    );
  };

  const handleRequest = async (): Promise<void> => {
    dispatch(setStatus(''));
    dispatch(setResponseBody(''));
    const { status: statusCode, data, errorMessage } = await getResponse(method, endpoint, headers, variables, body);
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

  return (
    <>
      <div className={styles.items}>
        <h2 className={styles.sectionTitle}>URL</h2>
        <MethodButtons method={method} onMethodChange={setMethod} />
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
        <ClientTable title="Header" tableInfo={headers} onChange={(newHeaders) => dispatch(setHeaders(newHeaders))} />
        <ClientTable
          title="Variable"
          tableInfo={variables}
          onChange={(newVariables) => dispatch(setVariables(newVariables))}
        />
        <div className={styles.item}>
          <h4>Body: </h4>
          <CustomTextarea label="Body" value={body} onChange={(e) => dispatch(setBody(e.target.value))} />
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
