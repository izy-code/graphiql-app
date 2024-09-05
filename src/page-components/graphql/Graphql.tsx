'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { IData } from '@/components/client-table/types.ts';
import GraphqlParamsContainer from '@/components/graphql-params-container/GraphqlParamsContainer';
import GraphqlUrlFieldset from '@/components/graphql-url-fieldset/GraphqlUrlFieldset.tsx';
import ResponseContainer from '@/components/response-container/ResponseContainer';
import SchemaContainer from '@/components/schema-container/SchemaContainer.tsx';
import { useAppDispatch } from '@/hooks/store-hooks';
import { setEndpoint, setHeaders, setQuery, setSchemaUrl, setVariables } from '@/store/graphql-slice/graphql-slice';
import { decodeBase64, generateUniqueId } from '@/utils/utils.ts';

import styles from './Graphql.module.scss';

interface RequestBody {
  query: string;
  variables: string;
}

const NO_ENDPOINT = 'no-endpoint-provided';

function GraphQl(): ReactNode {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      const pathParts: string[] = pathname.split('/').filter((_, index) => index > 2);
      const [endpointPart, requestBodyPart] = pathParts;

      if (endpointPart && endpointPart !== NO_ENDPOINT) {
        const decodedEndpoint = decodeBase64(endpointPart);
        dispatch(setEndpoint(decodedEndpoint));
        dispatch(setSchemaUrl(`${decodedEndpoint}?sdl`));
      }

      const decodedHeaders: IData[] = [];
      searchParams.forEach((value, key) => {
        decodedHeaders.push({ id: generateUniqueId(), key, value: decodeURIComponent(value) });
      });
      dispatch(setHeaders(decodedHeaders));

      if (requestBodyPart) {
        try {
          const parsedRequestBody = JSON.parse(decodeBase64(requestBodyPart || '{}')) as RequestBody;
          dispatch(setQuery(parsedRequestBody.query));
          dispatch(setVariables(parsedRequestBody.variables));
        } catch (error) {
          toast.error(`Can't parse request body in URL`);
        }
      }

      didMount.current = true;
    }
  }, [pathname, searchParams, dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>GraphiQl Client</h1>
        <GraphqlUrlFieldset />
        <SchemaContainer />
        <GraphqlParamsContainer />
      </div>

      <ResponseContainer />
    </div>
  );
}

export default AuthRoute(GraphQl);
