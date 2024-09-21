'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { LocalStorageKeys } from '@/common/enums.ts';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';
import { useScopedI18n } from '@/locales/client';
import { setIsShowResponse } from '@/store/rest-slice/rest-slice';

import styles from './RequestButton.module.scss';

function RequestButton(): JSX.Element {
  const router = useRouter();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const translate = useScopedI18n('requestButton');
  const dispatch = useAppDispatch();

  const handleRequest = (): void => {
    const requestsArray = (getStoredValue(LocalStorageKeys.REQUEST_LIST) as string[]) || [];
    requestsArray.push(window.location.href);
    setStoredValue(LocalStorageKeys.REQUEST_LIST, requestsArray);

    dispatch(setIsShowResponse(true));
    void router.refresh();
  };

  return (
    <div className={styles.center}>
      <Button className={styles.button} variant="contained" color="primary" onClick={handleRequest}>
        {translate('send')}
      </Button>
    </div>
  );
}

export default RequestButton;
