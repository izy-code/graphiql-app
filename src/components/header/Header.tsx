'use client';

import { Button, IconButton } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import { NonProtectedPaths } from '@/common/enums';
import { logOut } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';

import styles from './Header.module.scss';

export function Header(): ReactNode {
  const { user } = useAuth();
  const [lang, setLang] = useState(true);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>

      <div className={styles.rightContainer}>
        <IconButton
          onClick={() => setLang((p) => !p)}
          className={clsx(lang ? styles.usa : styles.russia)}
          size="large"
        />
        {user ? (
          <Button onClick={logOut}>Sign out</Button>
        ) : (
          <div className={styles.signLinks}>
            <Link href={NonProtectedPaths.SIGN_IN}>Sign in</Link>
            <Link href={NonProtectedPaths.SIGN_UP}>Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
