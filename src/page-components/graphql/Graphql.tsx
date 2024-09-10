'use client';

import { notFound, usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { STORE_RESET } from '@/common/constants';
import { ProtectedPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { TableRow } from '@/components/client-table/types';
import GraphqlParamsContainer from '@/components/graphql-params-container/GraphqlParamsContainer';
import GraphqlUrlFieldset from '@/components/graphql-url-fieldset/GraphqlUrlFieldset';
import ResponseContainer from '@/components/response-container/ResponseContainer';
import SchemaContainer from '@/components/schema-container/SchemaContainer';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useCurrentLocale } from '@/locales/client';
import { setEndpoint, setHeaders, setQuery, setSchemaUrl, setVariables } from '@/store/graphql-slice/graphql-slice';
import { decodeBase64, generateUniqueId } from '@/utils/utils';

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
  const locale = useCurrentLocale();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      if (pathname === `/${locale}${ProtectedPaths.GRAPHQL}`) {
        dispatch({ type: STORE_RESET });
        dispatch(setHeaders([{ id: generateUniqueId(), key: 'Content-Type', value: 'application/json' }]));
        window.history.replaceState(
          null,
          '',
          `/${locale}${ProtectedPaths.GRAPHQL}/${NO_ENDPOINT}?Content-Type=${encodeURIComponent('application/json')}`,
        );
        return;
      }

      if (pathname.split('/').length > 5) {
        notFound();
      }

      const pathParts: string[] = pathname.split('/').filter((_, index) => index > 2);
      const [endpointPart, requestBodyPart] = pathParts;

      if (endpointPart && endpointPart !== NO_ENDPOINT) {
        const decodedEndpoint = decodeBase64(endpointPart);
        dispatch(setEndpoint(decodedEndpoint));
        dispatch(setSchemaUrl(`${decodedEndpoint}?sdl`));
      }

      if (requestBodyPart) {
        try {
          const parsedRequestBody = JSON.parse(decodeBase64(requestBodyPart || '{}')) as RequestBody;
          dispatch(setQuery(parsedRequestBody.query));
          dispatch(setVariables(parsedRequestBody.variables));
        } catch (error) {
          toast.error(`Can't parse request body in URL`);
        }
      }

      const decodedHeaders: TableRow[] = [];

      searchParams.forEach((value, key) => {
        decodedHeaders.push({ id: generateUniqueId(), key, value: decodeURIComponent(value) });
      });
      dispatch(setHeaders(decodedHeaders));

      didMount.current = true;
    }
  }, [pathname, searchParams, dispatch, locale]);

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
