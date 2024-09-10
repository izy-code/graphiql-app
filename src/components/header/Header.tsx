'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';
import { useEffect, useState } from 'react';

import { NonProtectedPaths } from '@/common/enums';
import { type ErrorsFirebase } from '@/contexts/auth-context';
import { logOut } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useScopedI18n } from '@/locales/client';

import FlagButtons from '../flag-buttons/FlagButtons';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  const user = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const translate = useScopedI18n('header');
  const translateFirebase = useScopedI18n('firebase');

  const errors: ErrorsFirebase = useMemo(
    () => ({
      USER_DISABLED: translateFirebase('errors.USER_DISABLED'),
      INVALID_LOGIN_CREDENTIALS: translateFirebase('errors.INVALID_LOGIN_CREDENTIALS'),
      EMAIL_EXISTS: translateFirebase('errors.EMAIL_EXISTS'),
      TOO_MANY_ATTEMPTS_TRY_LATER: translateFirebase('errors.TOO_MANY_ATTEMPTS_TRY_LATER'),
    }),
    [translateFirebase],
  );

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
            <Button onClick={() => logOut(translateFirebase('sign-out.success'), errors)}>
              {translate('button.sign-out')}
            </Button>
          ) : (
            <>
              {!pathname.includes(NonProtectedPaths.SIGN_IN) && (
                <Link className={styles.footer_items} href={NonProtectedPaths.SIGN_IN}>
                  {translate('links.sign-in')}
                </Link>
              )}
              {!pathname.includes(NonProtectedPaths.SIGN_UP) && (
                <Link className={styles.footer_items} href={NonProtectedPaths.SIGN_UP}>
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
