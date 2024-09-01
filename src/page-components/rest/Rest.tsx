'use client';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import * as React from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import ClientTable from '@/components/client-table/ClientTable';
import type { IData } from '@/components/client-table/types.ts';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';

import styles from './Rest.module.scss';

const encodeBase64 = (str: string): string => Buffer.from(str, 'utf-8').toString('base64');
const decodeBase64 = (str: string): string => Buffer.from(str, 'base64').toString('utf-8');

function Rest(): ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  const [body, setBody] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');
  const [method, setMethod] = React.useState('GET');
  const [headers, setHeaders] = React.useState<IData[]>([]);
  const [variables, setVariables] = React.useState<IData[]>([]);
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
        const headersArray: IData[] = JSON.parse(decodedHeaders) as IData[];
        setHeaders(headersArray);
      } catch (jsonError) {
        setHeaders([]);
      }
    }
  }, [pathname]);

  const handleRequest = async (): Promise<void> => {
    try {
      const validHeaders = headers.filter(({ key, value }) => key.trim() && value.trim());

      const options: RequestInit = {
        method,
        headers: Object.fromEntries(validHeaders.map(({ key, value }) => [key, value])),
      };

      if (method !== 'GET' && body) {
        options.body = body;
      }
      const response = await fetch(endpoint, options);
      const data: unknown = await response.json();
      setStatus(response.status);
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus(500);
      setResponseBody(JSON.stringify({ error }, null, 2));
    }
  };

  const handleMethodChange = (newMethod: string): void => {
    setMethod(newMethod);
    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(body);
    const encodedHeaders = encodeBase64(JSON.stringify(headers));
    router.push(`/rest/${newMethod}/${encodedEndpoint}/${encodedHeaders}/${encodedBody}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>REST Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <MethodButtons method={method} onMethodChange={handleMethodChange} onBlur={handleRequest} />
          <CustomInput
            label="Endpoint URL"
            variant="standard"
            width="420px"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            onBlur={handleRequest}
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
              onBlur={handleRequest}
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
