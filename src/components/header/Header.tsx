'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import FlagButtons from '../flag-buttons/FlagButtons';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <nav className={styles.links}>
        <h2 className={styles.title}>
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
