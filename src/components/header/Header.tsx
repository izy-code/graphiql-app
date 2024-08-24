import type { ReactNode } from 'react';

import FlagButtons from '../flag-buttons/FlagButtons';
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
          <FlagButtons />
          <a className={styles.footer_items} href="/">
            Sign In
          </a>
          <a className={styles.footer_items} href="/">
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
}
