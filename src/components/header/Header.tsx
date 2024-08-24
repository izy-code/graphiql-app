'use client';

import { Button, IconButton } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import { NonProtectedPaths } from '@/common/enums';
import { useAuth } from '@/store/authSlice';

import styles from './styles.module.scss';

export function Header(): ReactNode {
  const [lang, setLang] = useState(true);
  const isAuthenticated = useAuth();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div className={styles.right}>
        <IconButton
          onClick={() => setLang((p) => !p)}
          className={clsx(lang ? styles.usa : styles.russia)}
          size="large"
        />
        {isAuthenticated ? <Button>Sign out</Button> : <Link href={NonProtectedPaths.LOGIN}>Sign in</Link>}
      </div>
    </header>
  );
}
