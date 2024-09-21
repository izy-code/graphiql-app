import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Loader.module.scss';

export function Loader({
  className,
  secondaryColor = false,
  loaderText,
}: {
  className?: string;
  secondaryColor?: boolean;
  loaderText?: string;
}): ReactNode {
  return (
    <div className={clsx(styles.loaderContainer, className)}>
      <div className={clsx(styles.loader, secondaryColor && styles.secondary)} />
      {loaderText ? (
        <h1 className={styles.loaderText}>{loaderText}</h1>
      ) : (
        <h1 className="visually-hidden">Loading...</h1>
      )}
    </div>
  );
}
