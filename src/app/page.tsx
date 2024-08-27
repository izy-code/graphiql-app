import { type ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Graphiql } from '@/components/graphiql/Graphiql';
import { Header } from '@/components/header/Header';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <div className={styles.page}>
      <Header />
      <Graphiql />
      <Footer />
    </div>
  );
}
