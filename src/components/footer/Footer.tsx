import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './Footer.module.scss';

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.links, styles.devs)}>
        <Link className={styles.link} href="https://github.com/izy-code">
          izy-code
        </Link>
        <Link className={styles.link} href="https://github.com/VadimKol">
          vadimkol
        </Link>
        <Link className={styles.link} href="https://github.com/BodnarAlex">
          bodnaralex
        </Link>
      </div>
      <div className={styles.links}>
        <Link className={styles.github} href="https://github.com/izy-code/graphiql-app" />
        <p className={styles.year}>2024</p>
        <Link className={styles.rss} href="https://rs.school/courses/" />
      </div>
    </footer>
  );
}
