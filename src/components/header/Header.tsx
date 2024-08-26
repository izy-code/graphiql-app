'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { RoutePath } from '@/common/enums';
import { logOut } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';

import { CustomButton } from '../custom-button/CustomButton';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  const { user } = useAuth();

  const handleLogoutClick = (): void => {
    void logOut();
    toast.success('You have been signed out');
  };

  return (
    <header className={styles.header}>
      <Link href={RoutePath.MAIN}>Logo</Link>
      {user ? (
        <CustomButton onClick={handleLogoutClick}>Sign Out</CustomButton>
      ) : (
        <div className={styles.links}>
          <Link href={RoutePath.SIGN_IN}>Sign In</Link>
          <Link href={RoutePath.SIGN_UP}>Sign Up</Link>
        </div>
      )}
    </header>
  );
}
