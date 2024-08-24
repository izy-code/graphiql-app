import Image from 'next/image';
import type { ReactNode } from 'react';

import logo from '../../assets/images/rss-logo.png';
import styles from './Footer.module.scss';

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a className={styles.footer_items} href="https://github.com/">
          Our project
        </a>
        <p>2024</p>
        <div className={styles.footer_items}>
          <Image className={styles.footer_image} src={logo} alt="logo" />
        </div>
      </div>
    </footer>
  );
}
