import type { Draft } from '@reduxjs/toolkit';
import type { IntrospectionQuery } from 'graphql';
import type { ChangeEvent, ReactNode } from 'react';
import { toast } from 'react-toastify';

import { LocalStorageKeys } from '@/common/enums';
import { getResponse, getSchema } from '@/common/graphQlApi';
import { CustomButton } from '@/components/custom-button/CustomButton';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useEncodeUrl } from '@/hooks/useEncodeUrl';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useI18n, useScopedI18n } from '@/locales/client';
import {
  setCurrentSchema,
  setEndpoint,
  setIsSchemaShown,
  setResponseBody,
  setSchemaUrl,
  setStatus,
} from '@/store/graphql-slice/graphql-slice';
import type { RootState } from '@/store/store';

import { CustomInput } from '../custom-input/CustomInput';
import styles from './GraphqlUrlFieldset.module.scss';

export function GraphqlUrlFieldset(): ReactNode {
  const { endpoint, schemaUrl, currentSchema, isSchemaShown, query, variables, headers } = useAppSelector(
    (state: RootState) => state.graphql,
  );
  const dispatch = useAppDispatch();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const { replaceUrl } = useEncodeUrl();
  const translate = useScopedI18n('graphql');
  const translateErrors = useI18n();

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

    if (errorMessage) {
      dispatch(setStatus(translateErrors(statusCode! as never)));
      toast.error(translateErrors(errorMessage as never));
      return;
    }

    dispatch(setStatus(statusCode!));
    dispatch(setResponseBody(JSON.stringify(data, null, 2)));
    toast.info(translate('request.completed'));
  };

  const handleSchemaRequest = async (): Promise<void> => {
    dispatch(setCurrentSchema(null));
    dispatch(setIsSchemaShown(false));

    const { data, errorMessage, status } = await getSchema(schemaUrl, headers);

    if (errorMessage) {
      toast.error(translateErrors(errorMessage as never).replace('{status}', status || ''));
      return;
    }

    dispatch(setCurrentSchema(data as Draft<IntrospectionQuery>));
    toast.info(translate('schema.completed'));
  };

  return (
    <div className={styles.items}>
      <h2 className={styles.sectionTitle}>URL</h2>
      <CustomInput
        label={translate('endpoint')}
        variant="outlined"
        value={endpoint}
        width="100%"
        onChange={handleEndpointChange}
      />
      <CustomInput
        label={translate('schema')}
        variant="outlined"
        value={schemaUrl}
        width="100%"
        onChange={(e) => dispatch(setSchemaUrl(e.target.value))}
      />
      <div className={styles.buttonsContainer}>
        <CustomButton onClick={handleRequest}>{translate('request')}</CustomButton>
        <CustomButton onClick={handleSchemaRequest} variant="secondary">
          {translate('schema.request')}
        </CustomButton>
        {currentSchema && (
          <CustomButton onClick={() => dispatch(setIsSchemaShown(!isSchemaShown))} variant="tertiary">
            {isSchemaShown ? translate('schema.hide') : translate('schema.show')}
          </CustomButton>
        )}
      </div>
    </div>
  );
}
