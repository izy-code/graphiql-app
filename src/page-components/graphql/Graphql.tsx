'use client';

import { notFound, usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { ProtectedPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import type { IData } from '@/components/client-table/types';
import GraphqlParamsContainer from '@/components/graphql-params-container/GraphqlParamsContainer';
import GraphqlUrlFieldset from '@/components/graphql-url-fieldset/GraphqlUrlFieldset';
import ResponseContainer from '@/components/response-container/ResponseContainer';
import SchemaContainer from '@/components/schema-container/SchemaContainer';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useEncodeUrl } from '@/hooks/useEncodeUrl';
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
  const didMount = useRef(false);
  const locale = useCurrentLocale();
  const { replaceCompleteUrl } = useEncodeUrl();

  useEffect(() => {
    if (!didMount.current) {
      const pathParts: string[] = pathname.split('/').filter((_, index) => index > 2);

      if (pathname.split('/').length > 4) {
        notFound();
      }

      const [endpointPart, requestBodyPart] = pathParts;

      if (endpointPart && endpointPart !== NO_ENDPOINT) {
        const decodedEndpoint = decodeBase64(endpointPart);
        dispatch(setEndpoint(decodedEndpoint));
        dispatch(setSchemaUrl(`${decodedEndpoint}?sdl`));
      }

      if (pathname !== `/${locale}${ProtectedPaths.GRAPHQL}`) {
        const decodedHeaders: IData[] = [];

        searchParams.forEach((value, key) => {
          decodedHeaders.push({ id: generateUniqueId(), key, value: decodeURIComponent(value) });
        });
        dispatch(setHeaders(decodedHeaders));
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

      replaceCompleteUrl();

      didMount.current = true;
    }
  }, [pathname, searchParams, dispatch, replaceCompleteUrl, locale]);

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