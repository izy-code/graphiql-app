import { type ReactNode } from 'react';

import { CustomButton } from '@/components/custom-button/CustomButton';
import { useScopedI18n } from '@/locales/client';

import styles from './ErrorPage.module.scss';

interface Props {
  errorMessage?: string;
}

export function ErrorPage({ errorMessage }: Props): ReactNode {
  const translate = useScopedI18n('error');

  const handleRefresh = (): void => window.location.reload();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{translate('title')}</h1>
      <p className={styles.text}>{translate('text')}</p>
      {errorMessage && (
        <>
          <p className={styles.errorDesc}>{translate('desc')}</p>
          <p className={styles.error}>{errorMessage}</p>
        </>
      )}
      <p className={styles.text}>{translate('recommendation')}</p>
      <CustomButton className={styles.refreshBtn} type="button" onClick={handleRefresh}>
        {translate('refresh')}
      </CustomButton>
    </div>
  );
}
