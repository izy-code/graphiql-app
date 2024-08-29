import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import github from '../../assets/images/github-mark-white.png';
import logo from '../../assets/images/rss-logo.png';
import styles from './Footer.module.scss';

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.links, styles.small)}>
        <Link className={styles.footer_link} href="https://github.com/izy-code">
          izy-code
        </Link>
        <Link className={styles.footer_link} href="https://github.com/VadimKol">
          vadimkol
        </Link>
        <Link className={styles.footer_link} href="https://github.com/BodnarAlex">
          bodnaralex
        </Link>
      </div>
      <div className={styles.links}>
        <div className={styles.footer_items}>
          <Link href="https://github.com/izy-code/graphiql-app">
            <Image className={styles.footer_image} src={github} alt="github" />
          </Link>
        </div>
        <p>2024</p>
        <div className={styles.footer_items}>
          <Link href="https://rs.school/courses/">
            <Image className={styles.footer_image} src={logo} alt="logo" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
