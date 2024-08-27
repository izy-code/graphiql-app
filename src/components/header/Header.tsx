'use client';

// import { Button, IconButton } from '@mui/material';
// import clsx from 'clsx';
// import Link from 'next/link';
import { type ReactNode } from 'react';
import { useEffect, useState } from 'react';

// import { NonProtectedPaths } from '@/common/enums';
// import { logOut } from '@/firebase/firebase';
// import { useAuth } from '@/hooks/useAuth';
import FlagButtons from '../flag-buttons/FlagButtons';
import styles from './Header.module.scss';

export function Header(): ReactNode {
  //  const { user } = useAuth();
  //  const [lang, setLang] = useState(true);
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
    // <header className={styles.header}>
    //   <Link href="/" className={styles.logo}>
    //     Logo
    //   </Link>

    //   <div className={styles.rightContainer}>
    //     <IconButton
    //       onClick={() => setLang((p) => !p)}
    //       className={clsx(lang ? styles.usa : styles.russia)}
    //       size="large"
    //     />
    //     {user ? (
    //       <Button onClick={logOut}>Sign out</Button>
    //     ) : (
    //       <div className={styles.signLinks}>
    //         <Link href={NonProtectedPaths.SIGN_IN}>Sign in</Link>
    //         <Link href={NonProtectedPaths.SIGN_UP}>Sign up</Link>
    //       </div>
    //     )}
    //   </div>
    // </header>
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
