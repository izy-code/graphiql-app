'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { NonProtectedPaths } from '@/common/enums';
import { logOut } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';

import FlagButtons from '../flag-buttons/FlagButtons';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  const user = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className={styles.logo}>
          <h2 className={styles.title}>
            RE
            <span className={styles.accent}>Q</span>
            UEST
          </h2>
        </Link>
        <div className={styles.right}>
          <FlagButtons />
          {user ? (
            <Button onClick={logOut}>Sign out</Button>
          ) : (
            <>
              {!pathname.includes(NonProtectedPaths.SIGN_IN) && <Link href={NonProtectedPaths.SIGN_IN}>Sign in</Link>}
              {!pathname.includes(NonProtectedPaths.SIGN_UP) && <Link href={NonProtectedPaths.SIGN_UP}>Sign up</Link>}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
