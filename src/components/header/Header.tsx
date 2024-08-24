'use client';

import { Button, IconButton } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import { isAuthenticated } from '@/utils/utils';

import styles from './styles.module.scss';

export function Header(): ReactNode {
  const [lang, setLang] = useState(true);

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
        {isAuthenticated ? <Button>Sign out</Button> : <Link href="/login">Sign in</Link>}
      </div>
    </header>
  );
}
