import Image from 'next/image';
import type { ReactNode } from 'react';

import flag from '../../assets/images/flag.jpg';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <nav className={styles.links}>
        <h2>
          RE
          <span className={styles.accent}>Q</span>
          UEST
        </h2>
        <div className={styles.right}>
          <Image className={styles.header_image} src={flag} alt="flag" />
          <p>Sing out</p>
        </div>
      </nav>
    </header>
  );
}
