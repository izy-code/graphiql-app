import type { Draft } from '@reduxjs/toolkit';
import type { IntrospectionSchema } from 'graphql';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { NO_ENDPOINT } from '@/common/constants.ts';
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
import { encodeBase64 } from '@/utils/utils.ts';

import CustomInput from '../custom-input/CustomInput.tsx';
import styles from './UrlFieldset.module.scss';

export default function UrlFieldset(): ReactNode {
  const { endpoint, schemaUrl, currentSchema, isSchemaShown, query, variables, headers } = useAppSelector(
    (state: RootState) => state.graphql,
  );
  const dispatch = useAppDispatch();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const { replaceUrl, getEncodedHeaders, getEncodedRequestBody } = useEncodeUrl();

  const handleEndpointChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEndpoint(evt.target.value));

    const encodedEndpoint = evt.target.value ? encodeBase64(evt.target.value) : NO_ENDPOINT;

    if (evt.target.value) {
      dispatch(setSchemaUrl(`${evt.target.value}?sdl`));
    } else {
      dispatch(setSchemaUrl(''));
    }

    if (query || variables) {
      replaceUrl(`${encodedEndpoint}/${getEncodedRequestBody()}${getEncodedHeaders()}`);
      return;
    }

    replaceUrl(`${encodedEndpoint}${getEncodedHeaders()}`);
  };

  const handleRequest = async (): Promise<void> => {
    dispatch(setStatus(''));
    dispatch(setResponseBody(''));

    const { status: statusCode, data, errorMessage } = await getResponse(endpoint, query, variables, headers);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    dispatch(setStatus(statusCode!.toString()));
    dispatch(setResponseBody(JSON.stringify(data, null, 2)));
    window.history.pushState(null, '', window.location.href);

    const requestsArray = (getStoredValue(LocalStorageKeys.URLS_RSS_REQUEST) as string[]) || [];
    setStoredValue(LocalStorageKeys.URLS_RSS_REQUEST, [window.location.href, ...requestsArray]);
  };

  const handleSchemaRequest = async (): Promise<void> => {
    dispatch(setCurrentSchema(null));
    dispatch(setIsSchemaShown(false));

    const { data, errorMessage } = await getSchema(schemaUrl, headers);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    dispatch(setCurrentSchema(data as Draft<IntrospectionSchema>));
    dispatch(setIsSchemaShown(true));
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
        label="Schema URL"
        variant="outlined"
        value={schemaUrl}
        width="100%"
        onChange={(e) => dispatch(setSchemaUrl(e.target.value))}
      />
      <div className={styles.buttonsContainer}>
        <CustomButton onClick={handleRequest}>Request</CustomButton>
        <CustomButton onClick={handleSchemaRequest} variant="secondary">
          Schema request
        </CustomButton>
        {currentSchema && (
          <CustomButton onClick={() => dispatch(setIsSchemaShown(!isSchemaShown))} variant="tertiary">
            {isSchemaShown ? 'Hide schema' : 'Show schema'}
          </CustomButton>
        )}
      </div>
    </div>
  );
}
