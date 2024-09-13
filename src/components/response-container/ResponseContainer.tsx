import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/store-hooks';
import { useScopedI18n } from '@/locales/client';
import type { RootState } from '@/store/store';

import { CustomTextarea } from '../custom-textarea/CustomTextarea';
import styles from './ResponseContainer.module.scss';

interface ResponseContainerProps {
  type: 'graphql' | 'rest';
}

export function ResponseContainer({ type }: ResponseContainerProps): ReactNode {
  const { status, responseBody } = useAppSelector((state: RootState) =>
    type === 'graphql' ? state.graphql : state.rest,
  );
  const translate = useScopedI18n('response');

  return (
    <div className={clsx(styles.section, styles.response)}>
      <h2 className={styles.sectionTitle}>{translate('title')}</h2>
      <div className={styles.oneLine}>
        <h4 className={styles.status}>{translate('status')}</h4>
        {status}
      </div>
      <div className={styles.body}>
        <CustomTextarea
          editorMode="json"
          titleText={translate('body')}
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
