'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { CustomButton } from '@/components/custom-button/CustomButton';
import { useScopedI18n } from '@/locales/client';

import styles from './ErrorStatusPage.module.scss';

export default function ErrorStatusPage({ status, message }: { status: number; message: string }): ReactNode {
  const router = useRouter();
  const translate = useScopedI18n('404');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{status}</h1>
      <p className={styles.text}>{message}</p>
      <div className={styles.buttons}>
        <CustomButton onClick={() => router.back()}>{translate('back')}</CustomButton>
        <CustomButton onClick={() => router.push('/')}>{translate('main')}</CustomButton>
      </div>
    </div>
  );
}
