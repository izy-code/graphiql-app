import type { Draft } from '@reduxjs/toolkit';
import type { IntrospectionQuery } from 'graphql';
import type { ChangeEvent, ReactNode } from 'react';
import { toast } from 'react-toastify';

import { LocalStorageKeys } from '@/common/enums.ts';
import { getResponse, getSchema } from '@/common/graphQlApi.ts';
import { CustomButton } from '@/components/custom-button/CustomButton.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks.ts';
import { useEncodeUrl } from '@/hooks/useEncodeUrl.ts';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';
import {
  setCurrentSchema,
  setEndpoint,
  setIsSchemaShown,
  setResponseBody,
  setSchemaUrl,
  setStatus,
} from '@/store/graphql-slice/graphql-slice.ts';
import type { RootState } from '@/store/store';

import CustomInput from '../custom-input/CustomInput.tsx';
import styles from './GraphqlUrlFieldset.module.scss';

export default function GraphqlUrlFieldset(): ReactNode {
  const { endpoint, schemaUrl, currentSchema, isSchemaShown, query, variables, headers } = useAppSelector(
    (state: RootState) => state.graphql,
  );
  const dispatch = useAppDispatch();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const { replaceUrl } = useEncodeUrl();

  const handleEndpointChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEndpoint(evt.target.value));
    replaceUrl({ endpointParam: evt.target.value });

    if (evt.target.value) {
      dispatch(setSchemaUrl(`${evt.target.value}?sdl`));
    } else {
      dispatch(setSchemaUrl(''));
    }
  };

  const handleRequest = async (): Promise<void> => {
    const requestsArray = (getStoredValue(LocalStorageKeys.REQUEST_LIST) as string[]) || [];
    requestsArray.push(window.location.href);
    setStoredValue(LocalStorageKeys.REQUEST_LIST, requestsArray);
    window.history.pushState(null, '', window.location.href);
    dispatch(setStatus(''));
    dispatch(setResponseBody(''));

    const { status: statusCode, data, errorMessage } = await getResponse(endpoint, query, variables, headers);

    dispatch(setStatus(statusCode!));

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    dispatch(setResponseBody(JSON.stringify(data, null, 2)));
    toast.info('The request has been completed, look at the response body');
  };

  const handleSchemaRequest = async (): Promise<void> => {
    dispatch(setCurrentSchema(null));
    dispatch(setIsSchemaShown(false));

    const { data, errorMessage } = await getSchema(schemaUrl, headers);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    dispatch(setCurrentSchema(data as Draft<IntrospectionQuery>));
    toast.info('The schema docs have been loaded, now you can open docs explorer');
  };

  return (
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
        label="Schema docs URL"
        variant="outlined"
        value={schemaUrl}
        width="100%"
        onChange={(e) => dispatch(setSchemaUrl(e.target.value))}
      />
      <div className={styles.buttonsContainer}>
        <CustomButton onClick={handleRequest}>Request</CustomButton>
        <CustomButton onClick={handleSchemaRequest} variant="secondary">
          Docs request
        </CustomButton>
        {currentSchema && (
          <CustomButton onClick={() => dispatch(setIsSchemaShown(!isSchemaShown))} variant="tertiary">
            {isSchemaShown ? 'Hide schema docs' : 'Show schema docs'}
          </CustomButton>
        )}
      </div>
    </div>
  );
}
