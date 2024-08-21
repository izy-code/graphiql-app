'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { CustomButton } from '@/components/custom-button/CustomButton';

import styles from './ErrorStatusPage.module.scss';

export default function ErrorStatusPage({ status, message }: { status: number; message: string }): ReactNode {
  const router = useRouter();

  const handleHomeClick = (): void => {
    void router.push('/');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{status}</h1>
        <p className={styles.text}>{message}</p>
        <div className={styles.buttons}>
          <CustomButton variant="tertiary" onClick={() => router.back()}>
            Previous page
          </CustomButton>
          <CustomButton variant="tertiary" onClick={handleHomeClick}>
            Home page
          </CustomButton>
        </div>
      </div>
    </main>
  );
}
