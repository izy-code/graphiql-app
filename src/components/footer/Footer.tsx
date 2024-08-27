import Link from 'next/link';
import { type ReactNode } from 'react';

import styles from './Footer.module.scss';

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.developers}>
        <Link href="https://github.com/izy-code">Izy</Link>
        <Link href="https://github.com/BodnarAlex">BodnarAlex</Link>
        <Link href="https://github.com/VadimKol">VadimKol</Link>
      </div>
      <p className={styles.year}>2024</p>
      <Link href="https://rs.school/" className={styles.rss} />
    </footer>
  );
}
