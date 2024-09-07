'use client';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import * as React from 'react';

import { LocalStorageKeys } from '@/common/enums.ts';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import ClientTable from '@/components/client-table/ClientTable';
import type { ObjectWithId } from '@/components/client-table/types.ts';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';
import { decodeBase64, encodeBase64 } from '@/utils/utils.ts';

import styles from './Rest.module.scss';

const convertToHeadersObject = (data: ObjectWithId[]): { [key: string]: string } =>
  Object.fromEntries(data.filter(({ key, value }) => key.trim() && value.trim()).map(({ key, value }) => [key, value]));

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

interface RestProps {
  initialMethod: string;
}

function Rest({ initialMethod }: RestProps): ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  const [body, setBody] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');
  const [method, setMethod] = React.useState(initialMethod || 'GET');
  const [headers, setHeaders] = React.useState<ObjectWithId[]>([]);
  const [variables, setVariables] = React.useState<ObjectWithId[]>([]);
  const [status, setStatus] = React.useState<number | null>(null);
  const [responseBody, setResponseBody] = React.useState('');

  React.useEffect(() => {
    const pathParts: string[] = pathname.split('/').filter((_, index) => index > 2);
    if (pathParts.length >= 3) {
      const [methodParam, endpointParam, headersParam, bodyParam] = pathParts;

      setMethod(methodParam || '');
      setEndpoint(decodeBase64(endpointParam || '') || '');
      setBody(decodeBase64(bodyParam || '') || '');
      try {
        const decodedHeaders = decodeBase64(headersParam || '');
        const headersArray: ObjectWithId[] = JSON.parse(decodedHeaders) as ObjectWithId[];
        setHeaders(headersArray);
      } catch (jsonError) {
        setHeaders([]);
      }
    }
  }, [pathname]);

  const handleRequest = async (): Promise<void> => {
    try {
      const validHeaders = convertToHeadersObject(headers);
      const options: RequestInit = {
        method,
        headers: validHeaders,
      };

      if (method !== 'GET' && body) {
        options.body = JSON.stringify(JSON.parse(replaceVariables(body, variables)));
      }
      const response = await fetch(endpoint, options);
      const data: unknown = await response.json();
      setStatus(response.status);
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus(500);
      setResponseBody(JSON.stringify({ error }, null, 2));
    }
    const urlToSave = `/rest/${method}/${encodeBase64(endpoint)}/${encodeBase64(JSON.stringify(headers))}/${encodeBase64(replaceVariables(body, variables))}`;
    const existingUrls = JSON.parse(localStorage.getItem(LocalStorageKeys.URLS_RSS_REQUEST) || '[]') as string[];
    existingUrls.push(urlToSave);
    localStorage.setItem(LocalStorageKeys.URLS_RSS_REQUEST, JSON.stringify(existingUrls));
  };

  // const handleUrlChange = (): void => {
  //   const encodedEndpoint = encodeBase64(endpoint);
  //   const encodedBody = encodeBase64(body);
  //   const encodedHeaders = encodeBase64(JSON.stringify(headers));
  //   router.push(`/rest/${method}/${encodedEndpoint}/${encodedHeaders}/${encodedBody}`);
  // };

  const handleMethodChange = (newMethod: string): void => {
    setMethod(newMethod);
    // handleUrlChange();
    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(replaceVariables(body, variables));
    const encodedHeaders = encodeBase64(JSON.stringify(headers));
    router.push(`/rest/${newMethod}/${encodedEndpoint}/${encodedHeaders}/${encodedBody}`);
  };

  // const handleEndUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setEndpoint(e.target.value);
  //   const encodedEndpoint = encodeBase64(endpoint);
  //   const encodedBody = encodeBase64(replaceVariables(body, variables));
  //   const encodedHeaders = encodeBase64(JSON.stringify(headers));
  //   router.push(`/rest/${method}/${e.target.value}/${encodedHeaders}/${encodedBody}`);
  // };

  // const handleHeaderChange = (newHeaders: ObjectWithId[]): void => {
  //   setHeaders(newHeaders);
  //   const encodedEndpoint = encodeBase64(endpoint);
  //   const encodedBody = encodeBase64(replaceVariables(body, variables));
  //   const encodedHeaders = encodeBase64(JSON.stringify(newHeaders));
  //   router.push(`/rest/${method}/${encodedEndpoint}/${encodedHeaders}/${encodedBody}`);
  // };

  // const handleTextareaBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setBody(e.target.value);
  //   const encodedEndpoint = encodeBase64(endpoint);
  //   const encodedBody = encodeBase64(replaceVariables(e.target.value, variables));
  //   const encodedHeaders = encodeBase64(JSON.stringify(headers));
  //   router.push(`/rest/${method}/${encodedEndpoint}/${encodedHeaders}/${encodedBody}`);
  // };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>REST Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <MethodButtons method={method} onMethodChange={handleMethodChange} />
          <CustomInput
            label="Endpoint URL"
            variant="standard"
            width="420px"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Params</h2>
          <ClientTable title="Header" tableInfo={headers} onChange={setHeaders} />
          <ClientTable title="Variable" tableInfo={variables} onChange={setVariables} />
          <div className={styles.item}>
            <h4>Body: </h4>
            <CustomTextarea
              label="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              // onBlur={handleTextareaBlur}
            />
          </div>
          <div className={styles.center}>
            <Button className={styles.button} variant="contained" color="primary" onClick={handleRequest}>
              Send Request
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Response</h2>
        <div className={styles.oneLine}>
          <h4>Status:</h4>
          {status !== null ? status : 'N/A'}
        </div>
        <div>
          <h4>Body:</h4>
          <Box
            component="pre"
            sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: 'max-content', overflow: 'auto' }}
          >
            {responseBody && <pre>{JSON.stringify(JSON.parse(responseBody), null, 2)}</pre>}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AuthRoute(Rest);
