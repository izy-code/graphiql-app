'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { type ReactNode } from 'react';

import { LocalStorageKeys } from '@/common/enums.ts';
import { useLocalStorage } from '@/hooks/useLocalStorage.ts';

import styles from './RequestButton.module.scss';

function RequestButton(): ReactNode {
  const router = useRouter();
  const { getStoredValue, setStoredValue } = useLocalStorage();

  const handleRequest = (): void => {
    // window.location.reload();

    const requestsArray = (getStoredValue(LocalStorageKeys.URLS_RSS_REQUEST) as string[]) || [];
    setStoredValue(LocalStorageKeys.URLS_RSS_REQUEST, [window.location.href, ...requestsArray]);
    void router.refresh();
  };

  return (
    <div className={styles.center}>
      <Button className={styles.button} variant="contained" color="primary" onClick={handleRequest}>
        Send Request
      </Button>
    </div>
  );
}

export default RequestButton;
