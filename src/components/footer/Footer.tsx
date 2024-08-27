import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import logo from '../../assets/images/rss-logo.png';
import styles from './Footer.module.scss';

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link className={styles.footer_items} href="https://github.com/izy-code/graphiql-app">
          Our project
        </Link>
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
