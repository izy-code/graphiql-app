'use client';

import Box from '@mui/material/Box';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { LocalStorageKeys, ProtectedPaths } from '@/common/enums.ts';
import { getResponse } from '@/common/graphQlApi.ts';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { IData } from '@/components/client-table/types.ts';
import { CustomButton } from '@/components/custom-button/CustomButton.tsx';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';
import { useCurrentLocale } from '@/locales/client.ts';
import { decodeBase64, encodeBase64, generateUniqueId } from '@/utils/utils.ts';

import ClientTable from '../../components/client-table/ClientTable.tsx';
import CustomInput from '../../components/custom-input/CustomInput.tsx';
import CustomTextarea from '../../components/custom-textarea/CustomTextarea';
import styles from './Graphql.module.scss';

interface RequestBody {
  query: string;
  variables: string;
}

const NO_ENDPOINT = 'no-endpoint-provided';

function GraphQl(): ReactNode {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useCurrentLocale();
  const { getStoredValue, setStoredValue } = useLocalStorage();

  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [status, setStatus] = useState('N/A');
  const [responseBody, setResponseBody] = useState('{}');
  const [endpoint, setEndpoint] = useState('');
  const [sdl, setSdl] = useState('');
  const [headers, setHeaders] = useState<IData[]>([]);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      const pathParts: string[] = pathname.split('/').filter((_, index) => index > 2);
      const [endpointPart, requestBodyPart] = pathParts;

      if (endpointPart && endpointPart !== NO_ENDPOINT) {
        const decodedEndpoint = decodeBase64(endpointPart);
        setEndpoint(decodedEndpoint);
        setSdl(`${decodedEndpoint}?sdl`);
      }

      const decodedHeaders: IData[] = [];
      searchParams.forEach((value, key) => {
        decodedHeaders.push({ id: generateUniqueId(), key, value: decodeURIComponent(value) });
      });
      setHeaders(decodedHeaders);

      if (requestBodyPart) {
        try {
          const parsedRequestBody = JSON.parse(decodeBase64(requestBodyPart || '{}')) as RequestBody;
          setQuery(parsedRequestBody.query);
          setVariables(parsedRequestBody.variables);
        } catch (error) {
          toast.error(`Can't parse request body in URL`);
        }
      }

      didMount.current = true;
    }
  }, [pathname, searchParams]);

  const replaceUrl = (urlEnding: string, urlStart = `/${locale}${ProtectedPaths.GRAPHQL}/`): void => {
    window.history.replaceState(null, '', `${urlStart}${urlEnding}`);
  };

  const getEncodedEndpoint = (): string => (endpoint ? encodeBase64(endpoint) : NO_ENDPOINT);

  const getEncodedRequestBody = (): string => {
    const requestBody = JSON.stringify({
      query,
      variables,
    });
    return encodeBase64(requestBody);
  };

  const getEncodedHeaders = (headersParameter: IData[] = headers): string => {
    if (!headersParameter.length) {
      return '';
    }

    const encodedHeaders: string[] = [];
    headersParameter.forEach((header) => {
      encodedHeaders.push(`${header.key}=${encodeURIComponent(header.value)}`);
    });

    return `?${encodedHeaders.join('&')}`;
  };

  const handleRequest = async (): Promise<void> => {
    setStatus('');
    setResponseBody('');

    const { status: statusCode, data, errorMessage } = await getResponse(endpoint, query, variables, headers);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setStatus(statusCode!.toString());
    setResponseBody(JSON.stringify(data, null, 2));
    window.history.pushState(null, '', window.location.href);

    const requestsArray = (getStoredValue(LocalStorageKeys.URLS_RSS_REQUEST) as string[]) || [];
    setStoredValue(LocalStorageKeys.URLS_RSS_REQUEST, [window.location.href, ...requestsArray]);
  };

  const handleEndpointChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setEndpoint(evt.target.value);

    const encodedEndpoint = evt.target.value ? encodeBase64(evt.target.value) : NO_ENDPOINT;

    if (evt.target.value) {
      setSdl(`${evt.target.value}?sdl`);
    } else {
      setSdl('');
    }

    if (query || variables) {
      replaceUrl(`${encodedEndpoint}/${getEncodedRequestBody()}${getEncodedHeaders()}`);
      return;
    }

    replaceUrl(`${encodedEndpoint}${getEncodedHeaders()}`);
  };

  const handleJsonEditorBlur = (): void => {
    if (!query && !variables) {
      replaceUrl(`${getEncodedEndpoint()}${getEncodedHeaders()}`);
      return;
    }

    replaceUrl(`${getEncodedEndpoint()}/${getEncodedRequestBody()}${getEncodedHeaders()}`);
  };

  const handleHeadersChange = (changedHeaders: IData[]): void => {
    setHeaders(changedHeaders);

    replaceUrl(getEncodedHeaders(changedHeaders), pathname);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>GraphiQl Client</h1>
        <div className={styles.items}>
          <h2 className={styles.sectionTitle}>URL</h2>
          <CustomInput
            label="Endpoint URL"
            variant="outlined"
            value={endpoint}
            width="100%"
            onChange={handleEndpointChange}
          />
          <CustomInput
            label="SDL URL"
            variant="outlined"
            value={sdl}
            width="100%"
            onChange={(e) => setSdl(e.target.value)}
          />
          <CustomButton className={styles.requestButton} onClick={handleRequest}>
            Request
          </CustomButton>
        </div>
        <div className={styles.section}>
          <div className={styles.item}>
            <h4>Query: </h4>
            <CustomTextarea
              label="Query"
              value={query}
              width="100%"
              onBlur={handleJsonEditorBlur}
              onChange={(e) => setQuery(e.target.value)}
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
              onChange={(e) => setVariables(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={clsx(styles.section, styles.response)}>
        <h2 className={styles.sectionTitle}>Response</h2>
        <div className={styles.oneLine}>
          <h4>Status:</h4>
          {status}
        </div>
        <div className={styles.body}>
          <h4>Body:</h4>
          <Box
            component="pre"
            sx={{ backgroundColor: 'inherit', p: 2, mt: 1, maxHeight: '400px', overflow: 'auto', width: '100%' }}
          >
            {responseBody}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AuthRoute(GraphQl);
