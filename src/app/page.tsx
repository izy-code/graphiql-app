import { type ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Welcome } from '@/components/welcome/Welcome';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <div className={styles.page}>
      <Header />
      <Welcome />
      <Footer />
    </div>
  );
}
