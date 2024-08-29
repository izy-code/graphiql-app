'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { CustomButton } from '@/components/custom-button/CustomButton';

import styles from './ErrorStatusPage.module.scss';

export default function ErrorStatusPage({ status, message }: { status: number; message: string }): ReactNode {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{status}</h1>
      <p className={styles.text}>{message}</p>
      <div className={styles.buttons}>
        <CustomButton onClick={() => router.back()}>Previous page</CustomButton>
        <CustomButton onClick={() => router.push('/')}>Main page</CustomButton>
      </div>
    </div>
  );
}
