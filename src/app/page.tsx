import { type ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <div className={styles.page}>
      <Header />
      <main>main</main>
      <Footer />
    </div>
  );
}
