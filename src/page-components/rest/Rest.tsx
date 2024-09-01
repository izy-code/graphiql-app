'use client';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
// import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import * as React from 'react';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import CustomInput from '@/components/custom-input/CustomInput';
import CustomTextarea from '@/components/custom-textarea/CustomTextarea';
import MethodButtons from '@/components/method-buttons/MethodButtons';
import TableHeaders from '@/components/table-headers/TableHeaders';

import styles from './Rest.module.scss';

interface HeaderData {
  key: string;
  value: string;
}

function Rest(): ReactNode {
  // const router = useRouter();
  const [body, setBody] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');
  const [method, setMethod] = React.useState('GET');
  const [headers, setHeaders] = React.useState<HeaderData[]>([]);
  const [status, setStatus] = React.useState<number | null>(null);
  const [responseBody, setResponseBody] = React.useState('');

  const handleRequest = async (): Promise<void> => {
    try {
      const options: RequestInit = {
        method,
        headers: Object.fromEntries(headers.map(({ key, value }) => [key, value])),
      };

      if (method !== 'GET' && body) {
        options.body = body;
      }
      // const encodedEndpoint = encodeBase64(endpoint);
      // const encodedBody = body ? encodeBase64(JSON.stringify(JSON.parse(body))) : '';
      // let routeUrl = `/${method}/${encodedEndpoint}`;
      // if (encodedBody) {
      //   routeUrl += `/${encodedBody}`;
      // }
      // const queryParams = headers
      //   .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      //   .join('&');
      // if (queryParams) {
      //   routeUrl += `?${queryParams}`;
      // }
      // router.push(routeUrl);

      const response = await fetch(endpoint, options);
      const data: unknown = await response.json();
      setStatus(response.status);
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus(500);
      setResponseBody(JSON.stringify({ error }, null, 2));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>REST Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <MethodButtons method={method} onMethodChange={setMethod} onBlur={handleRequest} />
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
          <TableHeaders headers={headers} onHeadersChange={setHeaders} />
          <div className={styles.item}>
            <h4>Body: </h4>
            <CustomTextarea
              label="Body"
              value={body}
              width="500px"
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
