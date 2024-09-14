'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { type ReactNode } from 'react';

import { LocalStorageKeys } from '@/common/enums.ts';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';
import { useScopedI18n } from '@/locales/client';

import styles from './RequestButton.module.scss';

interface RequestButtonProps {
  setShowResponse: (value: boolean) => void;
}
function RequestButton({ setShowResponse }: RequestButtonProps): ReactNode {
  const router = useRouter();
  const { getStoredValue, setStoredValue } = useLocalStorage();
  const translate = useScopedI18n('requestButton');

  const handleRequest = (): void => {
    const requestsArray = (getStoredValue(LocalStorageKeys.REQUEST_LIST) as string[]) || [];
    setStoredValue(LocalStorageKeys.REQUEST_LIST, [window.location.href, ...requestsArray]);
    setShowResponse(true);
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
