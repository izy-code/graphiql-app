import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import type { RootState } from '@/store/store';

import CustomTextarea from '../custom-textarea/CustomTextarea';
import styles from './ResponseContainer.module.scss';

export default function ResponseContainer(): ReactNode {
  const { status, responseBody } = useAppSelector((state: RootState) => state.graphql);

  return (
    <div className={clsx(styles.section, styles.response)}>
      <h2 className={styles.sectionTitle}>Response</h2>
      <div className={styles.oneLine}>
        <h4 className={styles.status}>Status:</h4>
        {status}
      </div>
      <div className={styles.body}>
        <CustomTextarea
          editorMode="json"
          titleText="Body: "
          value={responseBody}
          width="100%"
          readOnly
          editable={false}
          hasHideBtn={false}
          hasPrettifyBtn={false}
        />
      </div>
    </div>
  );
}
