'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { USER_LOGOUT } from '@/common/constants';
import { NonProtectedPaths } from '@/common/enums';
import { logOut } from '@/firebase/firebase';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useAuth } from '@/hooks/useAuth';
import { useScopedI18n } from '@/locales/client';

import FlagButtons from '../flag-buttons/FlagButtons';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  const user = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const translate = useScopedI18n('header');
  const dispatch = useAppDispatch();

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
            <Button
              className={styles.signElement}
              onClick={() => {
                void logOut();
                dispatch({ type: USER_LOGOUT });
              }}
            >
              {translate('button.sign-out')}
            </Button>
          ) : (
            <>
              {!pathname.includes(NonProtectedPaths.SIGN_IN) && (
                <Link className={styles.signElement} href={NonProtectedPaths.SIGN_IN}>
                  {translate('links.sign-in')}
                </Link>
              )}
              {!pathname.includes(NonProtectedPaths.SIGN_UP) && (
                <Link className={styles.signElement} href={NonProtectedPaths.SIGN_UP}>
                  {translate('links.sign-up')}
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
