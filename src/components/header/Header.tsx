'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { RoutePath } from '@/common/enums';
import { auth, logOut } from '@/firebase/firebase';

import { CustomButton } from '../custom-button/CustomButton';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  const [user] = useAuthState(auth);

  return (
    <header className={styles.header}>
      <Link href={RoutePath.MAIN}>Logo</Link>
      {user ? (
        <CustomButton onClick={logOut}>Sign Out</CustomButton>
      ) : (
        <div className={styles.links}>
          <Link href={RoutePath.SIGN_IN}>Sign In</Link>
          <Link href={RoutePath.SIGN_UP}>Sign Up</Link>
        </div>
      )}
    </header>
  );
}
